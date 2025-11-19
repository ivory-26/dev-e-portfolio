import React, { useRef, useEffect } from 'react';
import { Mic, MicOff, Terminal, Radio, RotateCcw } from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';
import { AnimatedButton } from '../ui/AnimatedButton';
import { useGeminiLive } from '../../hooks/useGeminiLive';

interface VoiceMatchWidgetProps {
  className?: string;
}

export const VoiceMatchWidget: React.FC<VoiceMatchWidgetProps> = ({ className = '' }) => {
  const { 
    isLive, 
    transcription, 
    error, 
    start, 
    stop, 
    reset, 
    analyserRef 
  } = useGeminiLive();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcription]);

  // Visualizer Logic
  useEffect(() => {
    if (!isLive || !analyserRef.current || !canvasRef.current) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        // Clear canvas when stopped
        const ctx = canvasRef.current?.getContext('2d');
        ctx?.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
        return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains('dark');
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 1.5;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        if (isDark) {
             gradient.addColorStop(0, 'rgba(34, 211, 238, 0.2)');
             gradient.addColorStop(1, '#ffffff');
        } else {
             gradient.addColorStop(0, 'rgba(8, 145, 178, 0.2)');
             gradient.addColorStop(1, '#09090b');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, 2);
        ctx.fill();

        x += barWidth + 2;
      }
    };

    draw();

    return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLive, analyserRef]);

  return (
    <GlowCard 
      className={`bg-surface border border-border p-1 flex flex-col h-full w-full relative overflow-hidden ${className}`}
      glowColor="rgba(255, 255, 255, 0.15)"
    >
      <div className="h-full w-full bg-white/90 dark:bg-black/80 backdrop-blur-sm p-6 flex flex-col relative z-10 rounded-sm transition-colors duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md border transition-colors ${
                    isLive 
                        ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                        : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-white/50'
                }`}>
                    <Terminal size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary leading-tight font-mono">KERNEL_TRANSCRIPT</h3>
                    <p className="text-xs text-muted font-mono">v2.5.1 // LIVE_INPUT_STREAM</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {isLive && (
                     <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-mono text-red-500 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        REC
                    </div>
                )}
            </div>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden min-h-[160px]">
             
             {!isLive && transcription.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                    <Radio size={48} className="mx-auto mb-6 text-zinc-300 dark:text-white/20 transition-colors" />
                    <AnimatedButton 
                        onClick={start}
                        icon={Mic}
                        className="px-8 py-3 text-sm font-mono tracking-wider"
                        variant="outline"
                    >
                        INIT_SEQUENCE_START
                    </AnimatedButton>
                </div>
             )}

             <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto font-['Caveat'] text-3xl md:text-5xl leading-relaxed tracking-normal space-y-1 pr-2 custom-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
             >
                {transcription.map((chunk, i) => (
                    <span 
                        key={i} 
                        className="inline-block text-primary animate-scribble mr-1"
                        style={{ 
                            textShadow: 'var(--text-shadow-glow)',
                            animationDelay: `${i * 0.03}s` 
                        }}
                    >
                        {chunk}
                    </span>
                ))}
                {isLive && (
                    <span className="inline-block w-2 h-8 bg-primary/80 animate-pulse ml-1 align-bottom mb-2 rounded-full rotate-12"></span>
                )}
             </div>
             
             <style>{`
                :root {
                    --text-shadow-glow: 0 0 10px rgba(0,0,0,0.1);
                }
                .dark {
                    --text-shadow-glow: 0 0 15px rgba(255,255,255,0.3);
                }
                @keyframes scribbleReveal {
                    0% { 
                        opacity: 0; 
                        transform: translateY(8px) scale(0.9) skewX(-15deg); 
                        filter: blur(4px);
                    }
                    50% {
                        opacity: 0.7;
                        filter: blur(1px);
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1) skewX(0); 
                        filter: blur(0);
                    }
                }
                .animate-scribble {
                    animation: scribbleReveal 0.5s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards;
                    transform-origin: bottom left;
                    will-change: transform, opacity, filter;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: var(--surface-color);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border-radius: 2px;
                }
             `}</style>

             {error && (
                <div className="text-red-400 text-xs font-mono mt-4 border-t border-red-500/20 pt-2">
                    &gt;&gt; ERROR: {error}
                </div>
             )}
        </div>

        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div className="h-8 w-32 md:w-48 relative opacity-60">
                 <canvas 
                    ref={canvasRef} 
                    width="200" 
                    height="40"
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex items-center gap-2">
                {transcription.length > 0 && (
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 rounded text-xs font-mono text-zinc-600 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                        title="Reset / Try Again"
                    >
                        <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" /> 
                        <span className="hidden sm:inline">TRY AGAIN</span>
                    </button>
                )}

                {isLive && (
                    <button 
                        onClick={stop}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                    >
                        <MicOff size={12} /> TERMINATE
                    </button>
                )}
            </div>
        </div>

      </div>
    </GlowCard>
  );
};