import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useGeminiLive = () => {
  const [isLive, setIsLive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sessionRef = useRef<any>(null);
  const isConnectedRef = useRef<boolean>(false);

  const encodeAudioData = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const sanitizeToEnglish = (input: string) => {
    // Drop diacritics and non-ASCII characters so only English-friendly text remains
    const normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalized.replace(/[^a-zA-Z0-9.,!?"'()\-\s]/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const stop = useCallback(() => {
    setIsLive(false);
    isConnectedRef.current = false;

    // Close session first
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => {
        if (session && typeof session.close === 'function') {
          session.close().catch(() => {
            // Ignore errors on close
          });
        }
      }).catch(() => {
        // Ignore errors
      });
      sessionRef.current = null;
    }

    // Stop tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // Disconnect audio nodes
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    // Close context
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
      }
      audioContextRef.current = null;
    }
  }, []);

  const start = useCallback(async () => {
    if (isLive) return;

    try {
      setError(null);
      setTranscription([]);

      if (!GEMINI_API_KEY) {
        setError("API Key missing. Check your .env file.");
        return;
      }

      if (!GEMINI_API_KEY.startsWith('AIza')) {
        setError("Invalid API key format. Check your VITE_GEMINI_API_KEY in .env");
        return;
      }

      console.log('Starting Gemini Live session...');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      console.log('Microphone access granted');

      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          systemInstruction:
            "You are a silent listener. Transcribe the user's speech into English text only. Do not respond via audio.",
        },
        callbacks: {
          onopen: () => {
            console.log('WebSocket connection opened');
            isConnectedRef.current = true;
            setIsLive(true);
            // Initialize Audio Context pipeline once connection is open
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                const audioCtx = new AudioContextClass({ sampleRate: 16000 });
                audioContextRef.current = audioCtx;
    
                if (audioCtx.state === 'suspended') {
                  audioCtx.resume();
                }
    
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 256;
                analyserRef.current = analyser;
    
                const source = audioCtx.createMediaStreamSource(stream);
                const processor = audioCtx.createScriptProcessor(2048, 1, 1);
    
                processor.onaudioprocess = (e) => {
                  // Check if still connected before sending
                  if (!isConnectedRef.current || !sessionRef.current) {
                    return;
                  }

                  const inputData = e.inputBuffer.getChannelData(0);
                  const l = inputData.length;
                  const int16 = new Int16Array(l);
                  for (let i = 0; i < l; i++) {
                    let s = Math.max(-1, Math.min(1, inputData[i]));
                    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
                  }
    
                  const base64Data = encodeAudioData(new Uint8Array(int16.buffer));
    
                  // Use the resolved session directly instead of promise
                  sessionPromise.then((session) => {
                    // Triple check: connection state, session exists, and not closing
                    if (isConnectedRef.current && session && sessionRef.current) {
                      try {
                        session.sendRealtimeInput({
                          media: {
                            mimeType: 'audio/pcm;rate=16000',
                            data: base64Data,
                          },
                        });
                      } catch (err) {
                        // Connection closed mid-send, stop processing
                        isConnectedRef.current = false;
                      }
                    }
                  }).catch(() => {
                      // Session ended
                      isConnectedRef.current = false;
                  });
                };
    
                source.connect(analyser);
                analyser.connect(processor);
                processor.connect(audioCtx.destination);
    
                sourceRef.current = source;
                processorRef.current = processor;
            } catch (e) {
                console.error(e);
                setError("Audio pipeline failed");
                stop();
            }
          },
          onmessage: (msg: LiveServerMessage) => {
            if (msg.serverContent?.inputTranscription) {
              const text = msg.serverContent.inputTranscription.text;
              if (text) {
                const sanitized = sanitizeToEnglish(text);
                if (sanitized) {
                  setTranscription((prev) => [...prev, sanitized]);
                }
              }
            }
          },
          onclose: () => {
            console.log('WebSocket connection closed');
            isConnectedRef.current = false;
            setIsLive(false);
            
            // Immediately stop audio processing
            if (processorRef.current) {
              processorRef.current.disconnect();
              processorRef.current.onaudioprocess = null;
            }
            if (sourceRef.current) {
              sourceRef.current.disconnect();
            }
            if (analyserRef.current) {
              analyserRef.current.disconnect();
            }
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            isConnectedRef.current = false;
            
            // Immediately stop audio processing on error
            if (processorRef.current) {
              processorRef.current.disconnect();
              processorRef.current.onaudioprocess = null;
            }
            
            if (isLive) {
               setError(`Connection error: ${err?.message || 'Unknown error'}`);
               stop();
            }
          },
        },
      });

      sessionRef.current = sessionPromise;
      
      // Wait for session to be established before returning
      await sessionPromise;
      console.log('Session established successfully');
    } catch (err: any) {
      console.error('Failed to start session:', err);
      setError(err?.message || "Connection failed. Please check permissions and API key.");
      stop();
    }
  }, [isLive, stop]);

  const reset = useCallback(() => {
    stop();
    setTranscription([]);
    setError(null);
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    isLive,
    transcription,
    error,
    start,
    stop,
    reset,
    analyserRef, 
  };
};