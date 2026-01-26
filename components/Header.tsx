
import React from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
  onStopAll: () => void;
  searchTerm: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onStopAll, searchTerm }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/30 p-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 bg-cyan-500 rounded-full blur-[2px]"></div>
        </div>
        <h1 className="font-sci-fi text-xl md:text-2xl tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          STAR WARS <span className="text-white">SOUNDBOARD</span>
        </h1>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="PROCURAR EFEITO..."
            className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-10 text-cyan-50 focus:outline-none focus:border-cyan-500 transition-colors uppercase text-sm tracking-wider font-semibold placeholder:text-slate-600"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          onClick={onStopAll}
          className="px-4 py-2 bg-red-950/20 border border-red-500/50 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-xs tracking-tighter uppercase flex items-center gap-2 group"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
          PARAR TUDO
        </button>
      </div>
    </header>
  );
};
