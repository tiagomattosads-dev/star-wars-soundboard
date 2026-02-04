
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'all': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  'Blasters': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'Sabres de Luz': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 20L4 4m16 0L4 20" />
    </svg>
  ),
  'Droids': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  'Naves & Motores': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  'Interface Imperial': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'Ambientes': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Custom': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelect }) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="w-full relative py-4 md:py-6">
      <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 px-4 md:px-0 md:flex-wrap md:justify-center">
        {allCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          const label = cat === 'all' ? 'TODOS' : cat;
          
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`flex-shrink-0 snap-center w-28 h-24 md:w-32 md:h-20 flex flex-col items-center justify-center gap-2 rounded-lg border transition-all duration-500 relative overflow-hidden group ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 grayscale hover:grayscale-0 hover:border-slate-600'
              }`}
            >
              {/* Background pattern for cards */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:10px_10px]"></div>
              
              {/* Icon Container */}
              <div className={`transition-transform duration-300 group-active:scale-90 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-600'}`}>
                {CATEGORY_ICONS[cat] || CATEGORY_ICONS['Custom']}
              </div>

              {/* Label */}
              <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                {label}
              </span>

              {/* Active Indicator Bar */}
              <div className={`absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 ${isActive ? 'bg-cyan-400 scale-x-100' : 'bg-transparent scale-x-0'}`}>
                <div className="absolute inset-0 bg-cyan-400 blur-[2px]"></div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700/50 group-hover:border-cyan-500/50"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700/50 group-hover:border-cyan-500/50"></div>
            </button>
          );
        })}
      </div>
      
      {/* Decorative gradients for mobile scroll cues */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none md:hidden z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none md:hidden z-10"></div>
    </div>
  );
};
