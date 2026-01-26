
export interface Sound {
  id: string;
  name: string;
  category: string;
  src: string;
  tags: string[];
}

export type Category = 
  | 'Blasters' 
  | 'Sabres de Luz' 
  | 'Droids' 
  | 'Naves & Motores' 
  | 'Interface Imperial' 
  | 'Ambientes' 
  | 'Custom';

export interface SoundState {
  currentId: string | null;
  isPlaying: boolean;
  progress: number;
  errorId: string | null;
}
