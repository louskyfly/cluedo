import type { CaseData } from '../../types';
import { case1 } from './case1';
import { case2 } from './case2';

export const cases: CaseData[] = [
  case1,
  case2,
  {
    id: 'case3', title: "Le Vol du Musée", illustration: '🖼️',
    description: "Une œuvre d’art disparaît d’un musée malgré un système de sécurité sophistiqué.",
    difficulty: 'Difficile', duration: 'À venir', intro: '', locations: [], characters: [], clues: [], timeline: [],
    solution: { summary: '', culpritIds: [], whatHappened: '', keyClueIds: [], correctTimelineOrder: [], questions: [] }
  },
  {
    id: 'case4', title: "Le Train Fantôme", illustration: '🚆',
    description: "Un train arrive en gare sans que son arrivée soit enregistrée.",
    difficulty: 'Difficile', duration: 'À venir', intro: '', locations: [], characters: [], clues: [], timeline: [],
    solution: { summary: '', culpritIds: [], whatHappened: '', keyClueIds: [], correctTimelineOrder: [], questions: [] }
  },
  {
    id: 'case5', title: "Le Secret de la Station Polaire", illustration: '🧊',
    description: "Une équipe scientifique cesse soudainement de communiquer avec l’extérieur.",
    difficulty: 'Difficile', duration: 'À venir', intro: '', locations: [], characters: [], clues: [], timeline: [],
    solution: { summary: '', culpritIds: [], whatHappened: '', keyClueIds: [], correctTimelineOrder: [], questions: [] }
  }
];

export function getCase(id: string) { return cases.find(c => c.id === id); }
