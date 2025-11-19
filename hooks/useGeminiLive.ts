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
        throw new Error("API Key missing");
      }

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

      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          systemInstruction:
            "You are a silent listener. Transcribe the user's speech into English text only. Do not respond via audio.",
        },
        callbacks: {
          onopen: () => {
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
                  const inputData = e.inputBuffer.getChannelData(0);
                  const l = inputData.length;
                  const int16 = new Int16Array(l);
                  for (let i = 0; i < l; i++) {
                    let s = Math.max(-1, Math.min(1, inputData[i]));
                    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
                  }
    
                  const base64Data = encodeAudioData(new Uint8Array(int16.buffer));
    
                  sessionPromise.then((session) => {
                    session.sendRealtimeInput({
                      media: {
                        mimeType: 'audio/pcm;rate=16000',
                        data: base64Data,
                      },
                    });
                  }).catch(() => {
                      // Silent catch for session end
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
            setIsLive(false);
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            if (isLive) {
               setError("Connection interrupted");
               stop();
            }
          },
        },
      });

      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error(err);
      setError("Connection failed. Please check permissions.");
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