
export enum Difficulty {
  BEGINNER = 'Principiante',
  INTERMEDIATE = 'Intermedio',
  ADVANCED = 'Avanzado',
  EXPERT = 'Experto'
}

export type Category = 
  | '1 DIABOLO'
  | 'INTRODUCCION A 2 DIABOLOS LOW'
  | 'PRIMEROS TRUCOS DE 2 DIABOLOS'
  | 'INTRODUCCION A 3 DIABOLOS LOW'
  | 'PRIMEROS TRUCOS DE 3 DIABOLOS'
  | 'VERTAX'
  | 'SITEWAP NOTATION BASICS'
  | 'INTEGRALES 1 DIABOLO'
  | 'CORPORALES';

export interface Trick {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  imageUrl: string;
  videoUrl?: string;
  likes: number;
  // New Social Fields
  username: string;
  userCountry: string;
  userAvatar?: string;
  timestamp: Date;
  comments: number;
  isPremium?: boolean; // Kept for legacy, though not used visually as requested
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
}

export enum ViewState {
  HOME = 'HOME',
  LEARN = 'LEARN',
  COACH = 'COACH',
  FORUM = 'FORUM',
  SUBSCRIBE = 'SUBSCRIBE',
  PROFILE = 'PROFILE',
  AUTH = 'AUTH',
  ABOUT = 'ABOUT'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum Language {
  ES = 'ES',
  EN = 'EN',
  FR = 'FR',
  DE = 'DE',
  ZH = 'ZH',
  JA = 'JA',
  PT = 'PT',
  IT = 'IT',
  RU = 'RU',
  AR = 'AR',
  HI = 'HI',
  KO = 'KO'
}

export interface User {
  username: string;
  fullName: string;
  country: string; // Origin (Public)
  residence?: string; // Hidden/Optional
  age?: number;
  playStyle?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  bio: string;
  avatarUrl?: string;
  coverUrl?: string; // New field for cover photo
  joinedDate: Date;
  role?: UserRole;
}

export enum ForumChannel {
  GLOBAL = 'DIABOLO GLOBAL',
  AMERICA = 'DIABOLO AMERICA',
  EUROPA = 'DIABOLO EUROPA',
  ASIA = 'DIABOLO ASIA',
  AFRICA = 'DIABOLO AFRICA',
  OCEANIA = 'DIABOLO OCEANIA'
}

export type MediaType = 'text' | 'image' | 'video' | 'link';

export interface ForumPost {
  id: string;
  userId: string;
  username: string;
  userCountry: string;
  avatarUrl?: string;
  channel: ForumChannel;
  content: string;
  mediaType: MediaType;
  mediaUrl?: string;
  timestamp: Date;
  likes: number;
  comments: number;
}
