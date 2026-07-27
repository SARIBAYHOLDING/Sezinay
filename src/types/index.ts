export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  isScratchable: boolean;
  scratchText?: string;
  rotation: number;
}

export interface MemoryLocation {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  coordinates: { x: number; y: number }; // percentage on mini map grid
  icon?: string;
  photoUrl?: string;
}

export interface VoiceNote {
  id: string;
  title: string;
  duration: string;
  date: string;
  audioUrl?: string;
  sender: 'SELO' | 'Sezinay';
  transcript?: string;
}

export interface LoveLetterData {
  sender: string;
  recipient: string;
  title: string;
  paragraphs: string[];
  signatureDate: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl?: string;
}
