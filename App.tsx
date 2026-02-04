
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { INITIAL_SOUNDS } from './data/sounds';
import { Sound, Category } from './types';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { SoundCard } from './components/SoundCard';
import { AddSoundModal } from './components/AddSoundModal';
import { useAudioPlayer } from './hooks/useAudioPlayer';

const App: React.FC = () => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [showFabMenu, setShowFabMenu] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentId, isPlaying, progress, currentTime, duration, errorId, play, stop } = useAudioPlayer();

  // Load data from localStorage
  useEffect(() => {
    const savedCustomSounds = localStorage.getItem('sw_custom_sounds');
    const customSounds: Sound[] = savedCustomSounds ? JSON.parse(savedCustomSounds) : [];
    
    const savedHiddenIds = localStorage.getItem('sw_hidden_sounds');
    const hidden: string[] = savedHiddenIds ? JSON.parse(savedHiddenIds) : [];
    setHiddenIds(hidden);

    const activeInitial = INITIAL_SOUNDS.filter(s => !hidden.includes(s.id));
    setSounds([...activeInitial, ...customSounds]);

    const savedFavorites = localStorage.getItem('sw_favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const params = new URLSearchParams(window.location.search);
    const soundId = params.get('sound');
    if (soundId) {
      setHighlightedId(soundId);
      setTimeout(() => {
        const el = document.getElementById(`sound-${soundId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      setTimeout(() => setHighlightedId(null), 5000);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sw_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('sw_hidden_sounds', JSON.stringify(hiddenIds));
  }, [hiddenIds]);

  const filteredSounds = useMemo(() => {
    return sounds.filter(sound => {
      const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           sound.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || sound.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sounds, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(sounds.map(s => s.category))) as Category[];
    return cats;
  }, [sounds]);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCopyLink = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('sound', id);
    navigator.clipboard.writeText(url.toString());
    alert('Link copiado para a área de transferência!');
  };

  const handleDeleteSound = useCallback((id: string) => {
    if (confirm('Tem certeza que deseja remover este efeito sonoro?')) {
      if (currentId === id) stop();

      setSounds(prev => {
        const newSounds = prev.filter(s => s.id !== id);
        if (id.startsWith('custom-')) {
          const customOnly = newSounds.filter(s => s.id.startsWith('custom-'));
          localStorage.setItem('sw_custom_sounds', JSON.stringify(customOnly));
        } else {
          setHiddenIds(h => [...h, id]);
        }
        return newSounds;
      });

      if (favorites.includes(id)) {
        setFavorites(f => f.filter(favId => favId !== id));
      }
    }
  }, [currentId, stop, favorites]);

  const handleAddSound = (newSound: { name: string; category: Category; src: string; tags: string[] }) => {
    const sound: Sound = {
      ...newSound,
      id: `custom-${Date.now()}`,
    };
    const updatedSounds = [...sounds, sound];
    setSounds(updatedSounds);
    
    const customOnly = updatedSounds.filter(s => s.id.startsWith('custom-'));
    localStorage.setItem('sw_custom_sounds', JSON.stringify(customOnly));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      
      handleAddSound({
        name: fileName,
        category: 'Custom',
        src: base64,
        tags: ['uploaded', 'local']
      });
      
      if (fileInputRef.current) fileInputRef.current.value = '';
      setShowFabMenu(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/10 via-slate-950 to-slate-950"></div>
      </div>

      <Header 
        searchTerm={searchTerm} 
        onSearch={setSearchTerm} 
        onStopAll={stop} 
      />

      <main className="flex-grow container mx-auto px-2 md:px-4 py-4 md:py-8 relative z-10 safe-bottom">
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelect={setSelectedCategory} 
        />

        {/* Desktop Controls (Hidden on mobile FAB replaced them) */}
        <div className="hidden md:flex justify-end gap-2 mb-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="audio/*" 
            className="hidden" 
          />
          <button
            onClick={triggerUpload}
            title="Upload Direto"
            className="p-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 rounded-md shadow-[0_0_10px_rgba(34,211,238,0.1)] group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 border border-cyan-500/50 text-cyan-400 font-bold text-xs tracking-widest uppercase hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 rounded-md shadow-[0_0_10px_rgba(34,211,238,0.1)]"
          >
            + NOVO EFEITO
          </button>
        </div>

        {filteredSounds.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
            {filteredSounds.map(sound => (
              <div key={sound.id} id={`sound-${sound.id}`}>
                <SoundCard 
                  sound={sound}
                  isPlaying={currentId === sound.id && isPlaying}
                  progress={currentId === sound.id ? progress : 0}
                  currentTime={currentId === sound.id ? currentTime : 0}
                  duration={currentId === sound.id ? duration : 0}
                  isFavorite={favorites.includes(sound.id)}
                  isHighlighted={highlightedId === sound.id}
                  hasError={errorId === sound.id}
                  onPlay={play}
                  onToggleFavorite={handleToggleFavorite}
                  onCopyLink={handleCopyLink}
                  onDelete={handleDeleteSound}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-pulse">
            <svg className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-sci-fi tracking-widest text-[10px] md:text-sm text-center uppercase">NÃO ENCONTRADO</p>
          </div>
        )}
      </main>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-[60]">
        {showFabMenu && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end animate-in slide-in-from-bottom-5 duration-200">
            <button
              onClick={triggerUpload}
              className="flex items-center gap-2 bg-slate-900 border border-cyan-500/40 text-cyan-400 px-4 py-2 rounded-full shadow-lg active:scale-95"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase">UPLOAD ARQUIVO</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button
              onClick={() => { setIsModalOpen(true); setShowFabMenu(false); }}
              className="flex items-center gap-2 bg-slate-900 border border-cyan-500/40 text-cyan-400 px-4 py-2 rounded-full shadow-lg active:scale-95"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase">NOVO MANUAL</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 active:scale-90 ${
            showFabMenu ? 'bg-red-500 text-white rotate-45 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-cyan-500 text-slate-950'
          }`}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <footer className="p-4 md:p-8 text-center text-slate-600 text-[10px] md:text-xs tracking-[0.2em] border-t border-slate-900 z-10">
        SISTEMA IMPERIAL &copy; {new Date().getFullYear()} • TRANSMISSÃO CRIPTOGRAFADA
      </footer>

      <AddSoundModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddSound} 
      />
    </div>
  );
};

export default App;
