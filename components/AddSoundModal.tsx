
import React, { useState } from 'react';
import { Category } from '../types';

interface AddSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sound: { name: string; category: Category; src: string; tags: string[] }) => void;
}

export const AddSoundModal: React.FC<AddSoundModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Custom');
  const [src, setSrc] = useState('/sounds/');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      category,
      src,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
    });
    setName('');
    setCategory('Custom');
    setSrc('/sounds/');
    setTags('');
    onClose();
  };

  const categories: Category[] = [
    'Blasters', 'Sabres de Luz', 'Droids', 'Naves & Motores', 'Interface Imperial', 'Ambientes', 'Custom'
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/50 rounded-xl p-6 shadow-[0_0_50px_rgba(34,211,238,0.15)] animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-sci-fi text-lg text-cyan-400">ADICIONAR EFEITO</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">Nome do Efeito</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Ex: Vader Breath"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">Caminho (URL ou local)</label>
            <input
              required
              type="text"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
              placeholder="/sounds/myeffect.mp3"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="sith, breathing, dark"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-md shadow-lg transition-all active:scale-95 uppercase tracking-widest text-xs"
            >
              CADASTRAR EFEITO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
