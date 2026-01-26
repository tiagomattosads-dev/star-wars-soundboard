
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-6 overflow-x-auto">
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
          selectedCategory === 'all'
            ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
        }`}
      >
        TODOS
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
            selectedCategory === cat
              ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
