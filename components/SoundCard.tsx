
import React from 'react';
import { Sound } from '../types';

interface SoundCardProps {
  sound: Sound;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  isFavorite: boolean;
  isHighlighted: boolean;
  hasError: boolean;
  onPlay: (id: string, src: string) => void;
  onToggleFavorite: (id: string) => void;
  onCopyLink: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SoundCard: React.FC<SoundCardProps> = ({
  sound,
  isPlaying,
  progress,
  currentTime,
  duration,
  isFavorite,
  isHighlighted,
  hasError,
  onPlay,
  onToggleFavorite,
  onCopyLink,
  onDelete,
}) => {
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = duration - currentTime;

  return (
    <div
      className={`group relative bg-slate-900/40 border transition-all duration-500 rounded-lg overflow-hidden flex flex-col h-full ${
        isPlaying
          ? 'border-cyan-400 scale-[1.02] bg-slate-800/60 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
          : hasError
          ? 'border-red-500/50 bg-red-950/10'
          : isHighlighted
          ? 'border-yellow-500 shadow-[0_0_15_rgba(234,179,8,0.3)]'
          : 'border-slate-800 hover:border-slate-600 hover:bg-slate-800/40'
      }`}
    >
      {/* Delete Button - Visible on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(sound.id);
        }}
        className="absolute top-2 left-2 p-1.5 bg-slate-950/80 text-slate-500 hover:text-red-500 border border-slate-800 hover:border-red-500/50 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
        title="Remover áudio"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {/* Background HUD elements */}
      <div className="absolute top-0 right-0 p-1 opacity-20 pointer-events-none">
        <div className="text-[10px] font-sci-fi text-cyan-400">ID: {sound.id.slice(0, 8)}</div>
      </div>

      {/* Error Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-red-900/20 backdrop-blur-[1px] flex items-center justify-center z-10 p-4 text-center">
          <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm animate-pulse">
            ERRO: ARQUIVO NÃO ENCONTRADO
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold tracking-widest text-cyan-500/80 uppercase ml-7 group-hover:ml-0 transition-all duration-300">
            {sound.category}
          </span>
          <button
            onClick={() => onToggleFavorite(sound.id)}
            className={`transition-colors duration-300 ${
              isFavorite ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-100 transition-colors line-clamp-2 min-h-[3.5rem]">
          {sound.name}
        </h3>

        <div className="mt-auto pt-4 flex flex-col gap-3">
          {/* Time Display HUD */}
          {isPlaying && (
            <div className="flex justify-between items-center text-[9px] font-sci-fi text-cyan-500/80 tracking-tighter">
              <span className="bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
                {formatTime(currentTime)}
              </span>
              <span className="animate-pulse">|</span>
              <span className="bg-slate-950/40 px-1.5 py-0.5 rounded border border-slate-700/50">
                -{formatTime(remainingTime)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={() => onPlay(sound.id, sound.src)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-cyan-500 text-slate-950 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.6)]'
                  : 'bg-slate-800 text-cyan-400 hover:bg-slate-700 hover:text-cyan-200'
              }`}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={() => onCopyLink(sound.id)}
              className="text-slate-500 hover:text-cyan-400 transition-colors p-2"
              title="Copiar Link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-950/50 overflow-hidden">
        {isPlaying && (
          <div 
            className="h-full bg-cyan-500 transition-all duration-150 ease-linear shadow-[0_0_12px_rgba(34,211,238,1)] relative" 
            style={{ width: `${progress}%` }}
          >
            {/* Energy Particle Effect */}
            <div className="absolute right-0 top-0 h-full w-2 bg-white blur-[2px] opacity-50"></div>
          </div>
        )}
      </div>
    </div>
  );
};
