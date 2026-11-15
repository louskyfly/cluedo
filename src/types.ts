export type ClueCategory = 'objets' | 'documents' | 'temoignages' | 'photographies' | 'enregistrements' | 'numerique';

export interface Clue {
  id: string;
  name: string;
  description: string;
  locationId: string;
  category: ClueCategory;
  importance: 1 | 2 | 3;
  illustration: string; // emoji or svg key
  documentText?: string;
  isDocument?: boolean;
}

export interface DialogueNode {
  id: string;
  text: string;
  options: DialogueOption[];
}

export interface DialogueOption {
  id: string;
  label: string;
  response: string;
  nextNodeId?: string;
  grantsClueIds?: string[];
  requiresClueIds?: string[];
  setsFlags?: string[];
  requiresFlags?: string[];
  contradiction?: string; // flag/id revealed
}

export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  portrait: string;
  knowledge: string[];
  startNodeId: string;
  nodes: Record<string, DialogueNode>;
}

export interface Hotspot {
  id: string;
  label: string;
  x: number; y: number; w: number; h: number; // percent
  description: string;
  clueId?: string;
  requiresClueIds?: string[];
  unlocksLocationId?: string;
  documentId?: string;
  zoomText?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  illustration: string; // scene key
  hotspots: Hotspot[];
  locked?: boolean;
  unlockHint?: string;
}

export interface TimelineEvent {
  id: string;
  time: string; // HH:MM
  label: string;
  details: string;
  correctIndex: number;
}

export interface Solution {
  summary: string;
  culpritIds: string[];
  whatHappened: string;
  keyClueIds: string[];
  correctTimelineOrder: string[]; // event ids
  questions: {
    id: string;
    prompt: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
    explanation: string;
  }[];
}

export interface CaseData {
  id: string;
  title: string;
  illustration: string;
  description: string;
  difficulty: 'Facile' | 'Moyenne' | 'Difficile';
  duration: string;
  locations: Location[];
  characters: Character[];
  clues: Clue[];
  timeline: TimelineEvent[];
  solution: Solution;
  intro: string;
}

export interface CaseProgress {
  caseId: string;
  startedAt: number;
  updatedAt: number;
  visitedLocations: string[];
  discoveredClues: string[];
  readDocuments: string[];
  dialogueFlags: string[];
  interviewed: string[];
  board: { nodes: BoardNode[]; edges: BoardEdge[]; notes: string[]; pan: {x:number;y:number}; zoom: number };
  timelineOrder: string[];
  hintsUsed: number;
  resolved: boolean;
  score?: ScoreResult;
  attempts: number;
}

export interface BoardNode { id: string; refId: string; kind: 'clue'|'character'|'location'|'event'|'note'; x: number; y: number; label: string; }
export interface BoardEdge { id: string; from: string; to: string; label?: string; }
export interface ScoreResult { total: number; clues: number; deductions: number; contradictions: number; hints: number; time: number; breakdown: string[]; }

export interface SaveData {
  version: number;
  slot: number;
  cases: Record<string, CaseProgress>;
  completed: Record<string, { score: ScoreResult; completedAt: number }>;
  stats: { totalPlayMs: number; casesCompleted: number };
  settings: { sound: boolean; textSize: 'normal'|'large'; };
}
