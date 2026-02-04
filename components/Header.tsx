
import React from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
  onStopAll: () => void;
  searchTerm: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onStopAll, searchTerm }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-cyan-500/30 px-4 py-3 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-cyan-500 rounded-full blur-[1.5px]"></div>
          </div>
          <h1 className="font-sci-fi text-lg md:text-2xl tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            SW <span className="text-white hidden xs:inline">SOUNDBOARD</span>
          </h1>
        </div>
        
        {/* Mobile Stop Button */}
        <button
          onClick={onStopAll}
          className="md:hidden p-2 text-red-500 bg-red-950/20 border border-red-500/30 rounded-full active:scale-90 transition-transform"
          title="Parar Tudo"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-grow md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="PROCURAR..."
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-cyan-50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all uppercase text-xs tracking-wider font-semibold placeholder:text-slate-600"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          onClick={onStopAll}
          className="hidden md:flex px-4 py-2 bg-red-950/20 border border-red-500/50 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-xs tracking-tighter uppercase items-center gap-2 group"
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
