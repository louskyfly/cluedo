import type { SaveData, CaseProgress, CaseData } from '../types';
import { loadSave, persistSave, ensureProgress } from './save';
import { getCase } from '../data/cases';

export type Screen = 'menu' | 'dossiers' | 'completed' | 'stats' | 'settings' | 'case' | 'intro';

export interface AppState {
  screen: Screen;
  save: SaveData;
  activeCaseId?: string;
  caseTab: 'lieux' | 'indices' | 'interrogatoires' | 'tableau' | 'chronologie' | 'resolution';
  activeLocationId?: string;
  activeCharacterId?: string;
  selectedClueId?: string;
  notice?: string;
}

type Listener = () => void;
const listeners: Listener[] = [];

export const state: AppState = {
  screen: 'menu',
  save: loadSave(),
  caseTab: 'lieux',
};

export function subscribe(fn: Listener) { listeners.push(fn); return () => { const i = listeners.indexOf(fn); if (i>=0) listeners.splice(i,1); }; }
export function emit() { for (const l of [...listeners]) l(); }

let saveTimer: any;
export function markDirty() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => persistSave(state.save), 300);
}

export function setScreen(s: Screen) { state.screen = s; emit(); }
export function openCase(caseId: string) {
  const c = getCase(caseId);
  if (!c || c.locations.length === 0) { state.notice = 'Cette enquête sera bientôt disponible.'; emit(); setTimeout(()=>{state.notice=undefined; emit();}, 2500); return; }
  const p = ensureProgress(state.save, caseId);
  p.updatedAt = Date.now(); markDirty();
  state.activeCaseId = caseId;
  state.caseTab = 'lieux';
  state.activeLocationId = p.visitedLocations[0] || c.locations[0].id;
  state.activeCharacterId = undefined;
  state.screen = p.discoveredClues.length === 0 && p.visitedLocations.length === 0 ? 'intro' : 'case';
  emit();
}

export function activeCase(): CaseData | undefined { return state.activeCaseId ? getCase(state.activeCaseId) : undefined; }
export function progress(): CaseProgress | undefined { if (!state.activeCaseId) return undefined; return ensureProgress(state.save, state.activeCaseId); }

export function visitLocation(id: string) {
  const p = progress(); if (!p) return;
  if (!p.visitedLocations.includes(id)) p.visitedLocations.push(id);
  p.updatedAt = Date.now(); state.activeLocationId = id; markDirty(); emit();
}

export function discoverClue(id: string) {
  const p = progress(); if (!p) return false;
  if (p.discoveredClues.includes(id)) return false;
  p.discoveredClues.push(id); p.updatedAt = Date.now(); markDirty(); return true;
}

export function markDocumentRead(id: string) {
  const p = progress(); if (!p) return;
  if (!p.readDocuments.includes(id)) p.readDocuments.push(id);
  p.updatedAt = Date.now(); markDirty();
}

export function addFlag(flag: string) {
  const p = progress(); if (!p) return;
  if (!p.dialogueFlags.includes(flag)) p.dialogueFlags.push(flag);
  p.updatedAt = Date.now(); markDirty();
}
export function hasFlag(flag: string) { return progress()?.dialogueFlags.includes(flag) ?? false; }
export function hasClue(id: string) { return progress()?.discoveredClues.includes(id) ?? false; }

export function markInterviewed(charId: string) {
  const p = progress(); if (!p) return;
  if (!p.interviewed.includes(charId)) p.interviewed.push(charId);
  markDirty();
}
