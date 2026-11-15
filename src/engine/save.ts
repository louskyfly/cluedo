import type { SaveData, CaseProgress } from '../types';

const KEY = 'dcc_save_v1';

function defaultSave(): SaveData {
  return { version: 1, slot: 0, cases: {}, completed: {}, stats: { totalPlayMs: 0, casesCompleted: 0 }, settings: { sound: false, textSize: 'normal' } };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw) as SaveData;
    return { ...defaultSave(), ...parsed, settings: { ...defaultSave().settings, ...(parsed.settings||{}) } };
  } catch { return defaultSave(); }
}

export function persistSave(data: SaveData) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { console.error('save failed', e); }
}

export function getProgress(save: SaveData, caseId: string): CaseProgress | undefined { return save.cases[caseId]; }

export function ensureProgress(save: SaveData, caseId: string): CaseProgress {
  if (!save.cases[caseId]) {
    save.cases[caseId] = {
      caseId, startedAt: Date.now(), updatedAt: Date.now(), visitedLocations: [], discoveredClues: [], readDocuments: [],
      dialogueFlags: [], interviewed: [], board: { nodes: [], edges: [], notes: [], pan: {x:0,y:0}, zoom: 1 },
      timelineOrder: [], hintsUsed: 0, resolved: false, attempts: 0
    };
  }
  return save.cases[caseId];
}

export function resetSlot(): SaveData { const d = defaultSave(); persistSave(d); return d; }
