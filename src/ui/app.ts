import { state, subscribe, setScreen, openCase, activeCase, progress, visitLocation, discoverClue, markDocumentRead, addFlag, hasClue, hasFlag, markInterviewed, emit, markDirty } from '../engine/state';
import { persistSave, resetSlot, ensureProgress } from '../engine/save';
import { cases, getCase } from '../data/cases';
import type { CaseData, Clue, Character, BoardNode, BoardEdge, ScoreResult } from '../types';

let root: HTMLElement;

export function renderApp(el: HTMLElement) {
  root = el;
  subscribe(() => { render(); });
  render();
}

function render() {
  const s = state;
  let html = '';
  if (s.screen === 'menu') html = menuScreen();
  else if (s.screen === 'dossiers') html = dossiersScreen(false);
  else if (s.screen === 'completed') html = dossiersScreen(true);
  else if (s.screen === 'stats') html = statsScreen();
  else if (s.screen === 'settings') html = settingsScreen();
  else if (s.screen === 'intro') html = introScreen();
  else if (s.screen === 'case') html = caseScreen();
  if (s.notice) html += `<div class="notice">${esc(s.notice)}</div>`;
  root.innerHTML = html;
  bindEvents();
}

function esc(s: string) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!)); }

function menuScreen() {
  const hasContinue = Object.keys(state.save.cases).length > 0;
  return `<div class="screen"><div class="menu-hero">
    <div class="badge">Dossiers confidentiels</div>
    <h1>DETECTIVE<br><span style="font-size:1.2rem;color:#e8edf7;letter-spacing:.18em">CLASSIFIED CASES</span></h1>
    <p class="subtitle">Incarnez un détective privé. Explorez les lieux, interrogez les témoins, reliez les preuves et faites éclater la vérité.</p>
    <div class="menu-actions">
      <button class="primary" data-act="goto" data-screen="dossiers">Nouvelle enquête</button>
      <button data-act="goto" data-screen="dossiers" ${!hasContinue?'disabled':''}>Continuer</button>
      <button data-act="goto" data-screen="dossiers">Dossiers disponibles</button>
      <button data-act="goto" data-screen="completed">Affaires terminées</button>
      <button data-act="goto" data-screen="stats">Statistiques</button>
      <button data-act="goto" data-screen="settings">Paramètres</button>
    </div>
  </div></div>`;
}

function dossiersScreen(completedOnly: boolean) {
  const list = cases.filter(c => completedOnly ? !!state.save.completed[c.id] : true);
  return `<div class="screen">
    <div class="topbar"><button data-act="goto" data-screen="menu">← Menu</button><div class="title">${completedOnly?'AFFAIRES TERMINÉES':'DOSSIERS DISPONIBLES'}</div><div></div></div>
    <div class="scroll"><div class="grid">${list.map(c => cardCase(c)).join('') || '<p class="muted">Aucune affaire terminée pour le moment.</p>'}</div></div>
  </div>`;
}

function cardCase(c: CaseData) {
  const done = state.save.completed[c.id];
  const prog = state.save.cases[c.id];
  const playable = c.locations.length > 0;
  let status = 'Nouveau';
  let badge = 'badge';
  if (done) { status = `Terminée · Score ${done.score.total}`; badge='badge ok'; }
  else if (prog) { status = `En cours · ${prog.discoveredClues.length} indices`; badge='badge warn'; }
  else if (!playable) { status = 'Bientôt disponible'; }
  return `<div class="card">
    <div style="font-size:2.4rem">${c.illustration}</div>
    <h3>${esc(c.title)}</h3>
    <p class="muted">${esc(c.description)}</p>
    <div class="row" style="margin:8px 0"><span class="${badge}">${esc(status)}</span><span class="badge">Difficulté: ${esc(c.difficulty)}</span><span class="badge">Durée: ${esc(c.duration)}</span></div>
    <button class="${playable?'primary':''}" data-act="open-case" data-id="${c.id}" ${!playable?'disabled':''}>${done?'Rejouer':'Ouvrir le dossier'}</button>
  </div>`;
}

function statsScreen() {
  const st = state.save.stats; const done = Object.values(state.save.completed);
  const avg = done.length ? Math.round(done.reduce((a,b)=>a+b.score.total,0)/done.length) : 0;
  return `<div class="screen"><div class="topbar"><button data-act="goto" data-screen="menu">← Menu</button><div class="title">STATISTIQUES</div><div></div></div>
  <div class="scroll"><div class="grid">
    <div class="card"><h3>Affaires terminées</h3><p style="font-size:2rem;color:var(--accent)">${st.casesCompleted}</p></div>
    <div class="card"><h3>Score moyen</h3><p style="font-size:2rem;color:var(--accent)">${avg}</p></div>
    <div class="card"><h3>Affaires en cours</h3><p style="font-size:2rem;color:var(--accent)">${Object.keys(state.save.cases).filter(id=>!state.save.completed[id]).length}</p></div>
  </div></div></div>`;
}

function settingsScreen() {
  const s = state.save.settings;
  return `<div class="screen"><div class="topbar"><button data-act="goto" data-screen="menu">← Menu</button><div class="title">PARAMÈTRES</div><div></div></div>
  <div class="scroll" style="max-width:700px">
    <div class="card"><h3>Texte</h3><p class="muted">Taille du texte pour le confort de lecture.</p>
      <div class="row"><button data-act="textsize" data-v="normal" class="${s.textSize==='normal'?'primary':''}">Normal</button>
      <button data-act="textsize" data-v="large" class="${s.textSize==='large'?'primary':''}">Grand</button></div></div>
    <div class="card" style="margin-top:12px"><h3>Sauvegardes</h3><p class="muted">La progression est enregistrée automatiquement dans ce navigateur (plusieurs affaires conservées).</p>
      <button data-act="reset-save" style="border-color:#5a3030;color:#f2b3b3">Réinitialiser toutes les sauvegardes</button></div>
    <div class="card" style="margin-top:12px"><h3>Installation</h3><p class="muted">Sur iPad : Safari → Partager → "Sur l’écran d’accueil" pour installer la PWA. Mode paysage recommandé.</p></div>
  </div></div>`;
}

function introScreen() {
  const c = activeCase()!; const p = progress()!;
  return `<div class="screen"><div class="topbar"><button data-act="goto" data-screen="dossiers">← Dossiers</button><div class="title">${esc(c.title)}</div><div></div></div>
  <div class="scroll" style="max-width:800px;margin:0 auto">
    <div class="card"><div style="font-size:3rem">${c.illustration}</div><h2>${esc(c.title)}</h2>
    <p>${esc(c.intro)}</p>
    <div class="row"><span class="badge">${esc(c.difficulty)}</span><span class="badge">${c.locations.length} lieux</span><span class="badge">${c.characters.length} personnes</span><span class="badge">${c.clues.length} indices</span></div>
    <div style="margin-top:14px"><button class="primary" data-act="start-case">Commencer l'enquête</button></div></div>
  </div></div>`;
}

function caseScreen() {
  const c = activeCase()!; const p = progress()!;
  const tabs: [typeof state.caseTab,string][] = [['lieux','Lieux'],['indices','Indices'],['interrogatoires','Interrogatoires'],['tableau','Tableau'],['chronologie','Chronologie'],['resolution','Résolution']];
  return `<div class="screen case-shell">
    <div class="topbar"><button data-act="goto" data-screen="dossiers">← Dossiers</button><div class="title">${esc(c.title)}</div><div class="badge">${p.discoveredClues.length}/${c.clues.length} indices</div></div>
    <div class="case-tabs">${tabs.map(([id,label])=>`<button class="${state.caseTab===id?'active':''}" data-act="tab" data-tab="${id}">${label}</button>`).join('')}</div>
    <div class="case-body">${renderTab(c)}</div>
  </div>`;
}

function renderTab(c: CaseData) {
  switch(state.caseTab){
    case 'lieux': return renderLocations(c);
    case 'indices': return renderInventory(c);
    case 'interrogatoires': return renderDialogue(c);
    case 'tableau': return renderBoard(c);
    case 'chronologie': return renderTimeline(c);
    case 'resolution': return renderResolution(c);
  }
}
function renderLocations(c: CaseData) {
  const p = progress()!;
  if (!state.activeLocationId) state.activeLocationId = c.locations[0].id;
  const loc = c.locations.find(l=>l.id===state.activeLocationId) || c.locations[0];
  const unlocked = (l: any) => !l.locked || p.visitedLocations.includes(l.id) || p.discoveredClues.some(id => c.locations.some(x=>x.hotspots.some(h=>h.clueId===id && h.unlocksLocationId===l.id)));
  // auto unlock
  c.locations.forEach(l=>{ if(l.locked && unlocked(l) && !p.visitedLocations.includes(l.id)){} });
  return `<div class="loc-layout">
    <div class="loc-list">${c.locations.map(l=>{
      const isUnlocked = !l.locked || p.visitedLocations.includes(l.id) || isLocationUnlocked(c,l.id,p.discoveredClues);
      return `<button class="loc-item ${state.activeLocationId===l.id?'active':''}" data-act="loc" data-id="${l.id}" ${!isUnlocked?'disabled':''}>${isUnlocked?'📍':'🔒'} ${esc(l.name)}${!isUnlocked?'<br><span class="muted" style="font-size:.8rem">Verrouillé</span>':''}</button>`;
    }).join('')}</div>
    <div class="scene-wrap"><div class="scene" id="scene">${renderScene(c, loc)}</div></div>
  </div>`;
}

function isLocationUnlocked(c: CaseData, locId: string, discovered: string[]) {
  const loc = c.locations.find(l=>l.id===locId); if(!loc||!loc.locked) return true;
  return c.locations.some(l => l.hotspots.some(h => h.unlocksLocationId===locId && h.clueId && discovered.includes(h.clueId)));
}

function renderScene(c: CaseData, loc: any) {
  const p = progress()!;
  const canSee = !loc.locked || isLocationUnlocked(c, loc.id, p.discoveredClues) || p.visitedLocations.includes(loc.id);
  if (!canSee) return `<div class="scene-bg"></div><div class="scene-info">Lieu verrouillé. ${esc(loc.unlockHint||'')}</div>`;
  const bg = sceneSvg(loc.illustration, loc.name);
  const spots = (loc.hotspots||[]).map((h: any) => {
    const found = h.clueId ? p.discoveredClues.includes(h.clueId) : p.visitedLocations.includes(h.unlocksLocationId||'');
    return `<button class="hotspot ${found?'found':''}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%" data-act="hotspot" data-loc="${loc.id}" data-hid="${h.id}" aria-label="${esc(h.label)}"><span class="dot"></span></button>`;
  }).join('');
  return `<div class="scene-bg">${bg}</div>${spots}<div class="scene-info"><strong>${esc(loc.name)}</strong><div class="muted">${esc(loc.description)}</div><div class="muted" style="font-size:.85rem;margin-top:4px">Touchez les éléments lumineux pour examiner la scène.</div></div>`;
}

function sceneSvg(key: string, name: string) {
  const palettes: Record<string,[string,string,string]> = {
    hall:['#101522','#1a2235','#26314a'], bureau:['#14110f','#231d18','#3a2e24'], info:['#0b1218','#102030','#18324a'], labo:['#0e1418','#16242a','#22404a'], archives:['#14120f','#201c17','#332c22']
  };
  const p = palettes[key] || ['#101522','#1a2235','#26314a'];
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs><linearGradient id="g${key}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="0.6" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></linearGradient>
  <linearGradient id="glow${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(212,176,106,.18)"/><stop offset="1" stop-color="rgba(212,176,106,0)"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#g${key})"/>
  <rect x="80" y="120" width="1440" height="660" rx="18" fill="rgba(255,255,255,.03)" stroke="rgba(122,162,200,.18)"/>
  ${sceneDetails(key)}
  <rect width="1600" height="900" fill="url(#glow${key})"/>
  <text x="120" y="820" fill="rgba(232,237,247,.25)" font-size="42" font-family="Segoe UI" letter-spacing="6">${esc(name.toUpperCase())}</text>
  </svg>`;
}
function sceneDetails(key: string) {
  if (key==='hall') return `<rect x="120" y="520" width="420" height="220" rx="10" fill="#1b2433" stroke="#334"/><rect x="700" y="180" width="220" height="360" rx="8" fill="#141b28" stroke="#334"/><rect x="980" y="520" width="140" height="220" fill="#20283a"/><circle cx="1180" cy="220" r="18" fill="#7aa2c8" opacity=".6"/>`;
  if (key==='bureau') return `<rect x="520" y="420" width="520" height="40" rx="6" fill="#2a221b"/><rect x="560" y="460" width="40" height="220" fill="#241d17"/><rect x="960" y="460" width="40" height="220" fill="#241d17"/><rect x="240" y="180" width="220" height="160" fill="#1a2433" stroke="#334"/><rect x="1180" y="260" width="180" height="360" fill="#20283a"/>`;
  if (key==='info') return `<rect x="160" y="200" width="180" height="420" rx="8" fill="#16202d"/><rect x="380" y="200" width="180" height="420" rx="8" fill="#16202d"/><rect x="700" y="320" width="520" height="260" rx="8" fill="#0f1824" stroke="#2b3d55"/><rect x="740" y="360" width="180" height="120" fill="#0a2a3a"/><rect x="940" y="360" width="240" height="120" fill="#0a2230"/>`;
  if (key==='labo') return `<rect x="140" y="420" width="1320" height="50" rx="6" fill="#22313a"/><rect x="260" y="470" width="30" height="220" fill="#1b2730"/><rect x="720" y="470" width="30" height="220" fill="#1b2730"/><rect x="1180" y="470" width="30" height="220" fill="#1b2730"/><rect x="960" y="220" width="260" height="180" fill="#182833" stroke="#355"/> <rect x="300" y="260" width="200" height="140" fill="#1a2a33"/>`;
  if (key==='archives') return `<rect x="200" y="160" width="180" height="560" fill="#2a241b"/><rect x="420" y="160" width="180" height="560" fill="#2d261d"/><rect x="640" y="160" width="180" height="560" fill="#2a241b"/><rect x="980" y="160" width="420" height="560" fill="#262018"/><rect x="500" y="520" width="260" height="160" fill="#3a3328"/>`;
  return '';
}

function renderInventory(c: CaseData) {
  const p = progress()!;
  const clues = c.clues.filter(cl => p.discoveredClues.includes(cl.id));
  const sel = clues.find(x=>x.id===state.selectedClueId) || clues[0];
  if (sel) state.selectedClueId = sel.id;
  return `<div class="inv-layout">
    <div class="inv-list"><h3 style="margin:6px 4px">Inventaire (${clues.length}/${c.clues.length})</h3>
      ${clues.length?clues.map(cl=>`<button class="inv-item ${sel?.id===cl.id?'active':''}" data-act="sel-clue" data-id="${cl.id}">${cl.illustration} <strong>${esc(cl.name)}</strong><br><span class="muted" style="font-size:.8rem">${esc(cl.category)} · Importance ${'★'.repeat(cl.importance)}</span></button>`).join(''):'<p class="muted">Aucun indice découvert. Explorez les lieux et interrogez les témoins.</p>'}
    </div>
    <div class="inv-detail">${sel?renderClueDetail(c,sel):'<p class="muted">Sélectionnez un indice.</p>'}</div>
  </div>`;
}
function renderClueDetail(c: CaseData, cl: Clue) {
  const loc = c.locations.find(l=>l.id===cl.locationId);
  const doc = cl.documentText ? `<h4>Contenu</h4><div class="doc">${esc(cl.documentText)}</div>` : '';
  return `<div class="card"><div style="font-size:2rem">${cl.illustration}</div><h2>${esc(cl.name)}</h2>
    <div class="row"><span class="badge">${esc(cl.category)}</span><span class="badge">Importance ${'★'.repeat(cl.importance)}</span><span class="badge">Lieu: ${esc(loc?.name||'?')}</span></div>
    <p style="margin-top:12px">${esc(cl.description)}</p>${doc}</div>`;
}

function renderDialogue(c: CaseData) {
  const p = progress()!;
  const ch = c.characters.find(x=>x.id===state.activeCharacterId) || c.characters[0];
  if (ch) state.activeCharacterId = ch.id;
  const log = getDialogueLog(ch.id);
  return `<div class="dialogue">
    <div class="char-list">${c.characters.map(chh=>`<button class="char-btn ${ch?.id===chh.id?'active':''}" data-act="char" data-id="${chh.id}"><strong>${chh.portrait} ${esc(chh.name)}</strong><br><span class="muted" style="font-size:.85rem">${esc(chh.role)}</span>${p.interviewed.includes(chh.id)?'<br><span class="badge ok">Interrogé</span>':''}</button>`).join('')}</div>
    <div class="dialogue-main">${ch?renderCharDialogue(c,ch,log):''}</div>
  </div>`;
}

const dialogueState: Record<string,{nodeId:string, log:{who:'npc'|'me', text:string}[]}> = {};
function getDialogueLog(charId: string) {
  const c = activeCase()!; const ch = c.characters.find(x=>x.id===charId)!;
  if (!dialogueState[charId]) dialogueState[charId] = { nodeId: ch.startNodeId, log: [{who:'npc', text: ch.nodes[ch.startNodeId].text}] };
  return dialogueState[charId];
}
function renderCharDialogue(c: CaseData, ch: Character, ds: {nodeId:string, log:{who:'npc'|'me', text:string}[]}) {
  const node = ch.nodes[ds.nodeId] || ch.nodes[ch.startNodeId];
  const opts = node.options.filter(o => (!o.requiresClueIds || o.requiresClueIds.every(id=>hasClue(id))) && (!o.requiresFlags || o.requiresFlags.every(f=>hasFlag(f))));
  return `<div style="padding:12px 16px;border-bottom:1px solid var(--border)"><strong>${ch.portrait} ${esc(ch.name)}</strong> <span class="muted">— ${esc(ch.role)}</span><div class="muted" style="font-size:.9rem">${esc(ch.bio)}</div></div>
  <div class="dialogue-log" id="dlog">${ds.log.map(m=>`<div class="bubble ${m.who}">${esc(m.text)}</div>`).join('')}</div>
  <div class="options">${opts.map(o=>`<button data-act="ask" data-char="${ch.id}" data-opt="${o.id}">${esc(o.label)}</button>`).join('')}</div>`;
}

function renderBoard(c: CaseData) {
  const p = progress()!;
  // ensure nodes for discovered clues/characters/locations visited exist? allow adding
  const b = p.board;
  const nodesHtml = b.nodes.map(n=>`<div class="board-node" data-node="${n.id}" style="left:${n.x}px;top:${n.y}px"><h4>${esc(n.label)}</h4><div class="muted" style="font-size:.8rem">${esc(n.kind)}</div>
    ${n.kind==='note'?`<textarea class="note-input" data-note="${n.id}">${esc((n as any).text||'')}</textarea>`:''}
    <div class="row" style="margin-top:6px"><button data-act="edge-from" data-id="${n.id}" style="padding:6px 8px;min-height:32px">Relier</button><button data-act="del-node" data-id="${n.id}" style="padding:6px 8px;min-height:32px">✕</button></div></div>`).join('');
  const edgesSvg = `<svg class="board-svg" width="4000" height="3000">${b.edges.map(e=>{ const a=b.nodes.find(n=>n.id===e.from), d=b.nodes.find(n=>n.id===e.to); if(!a||!d) return ''; const x1=a.x+90,y1=a.y+30,x2=d.x+90,y2=d.y+30; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d4b06a" stroke-width="2" opacity="0.7"/>`; }).join('')}</svg>`;
  return `<div class="board-wrap" id="boardWrap">
    <div class="board-toolbar">
      <button data-act="add-board" data-kind="clue">+ Preuve</button>
      <button data-act="add-board" data-kind="character">+ Personnage</button>
      <button data-act="add-board" data-kind="location">+ Lieu</button>
      <button data-act="add-board" data-kind="note">+ Note</button>
      <button data-act="zoom" data-dir="in">Zoom +</button>
      <button data-act="zoom" data-dir="out">Zoom -</button>
      <button data-act="clear-edges">Effacer liens</button>
    </div>
    <div class="board-canvas" id="boardCanvas" style="transform: translate(${b.pan.x}px,${b.pan.y}px) scale(${b.zoom}); width:4000px; height:3000px">${edgesSvg}${nodesHtml}</div>
  </div>`;
}

function renderTimeline(c: CaseData) {
  const p = progress()!;
  let order = p.timelineOrder.length ? p.timelineOrder : c.timeline.map(t=>t.id);
  if (p.timelineOrder.length === 0) { p.timelineOrder = [...order]; markDirty(); }
  const items = order.map(id => c.timeline.find(t=>t.id===id)).filter(Boolean) as any[];
  return `<div class="timeline"><h2>Chronologie des événements</h2>
    <p class="muted">Reconstituez l'ordre des événements à partir des horaires découverts et des témoignages. Utilisez ▲ ▼ pour ajuster l'ordre.</p>
    <div id="tlList">${items.map((t,i)=>`<div class="tl-item"><div class="tl-controls"><button data-act="tl-move" data-id="${t.id}" data-dir="up">▲</button><button data-act="tl-move" data-id="${t.id}" data-dir="down">▼</button></div>
      <div class="tl-time">${esc(t.time)}</div><div><strong>${esc(t.label)}</strong><div class="muted">${esc(t.details)}</div></div></div>`).join('')}</div>
    <div class="card" style="margin-top:12px"><h3>Incohérences relevées</h3><ul>${timelineHints(c,p).map(h=>`<li>${esc(h)}</li>`).join('') || '<li class="muted">Continuez l’enquête pour identifier des incohérences.</li>'}</ul></div>
  </div>`;
}
function timelineHints(c: CaseData, p: any) {
  const hints: string[] = [];
  if (p.discoveredClues.includes('c_badge')) hints.push("Aucune sortie badge pour Vasseur malgré le verrouillage interne à 23h12.");
  if (p.discoveredClues.includes('c_blackout') && p.discoveredClues.includes('c_logs')) hints.push("Coupure vidéo 22h-23h mais transfert de données à 22h47 : action volontaire probable.");
  if (p.discoveredClues.includes('c_service_door')) hints.push("La porte de service verrouillée de l'extérieur suggère une sortie vers le quai.");
  if (hasFlag('morel_logs_seen')) hints.push("Morel affirme avoir consulté les logs à 23h05 après son départ badge à 22h30 : accès à vérifier.");
  return hints;
}

function renderResolution(c: CaseData) {
  const p = progress()!;
  if (p.resolved && p.score) {
    return `<div class="resolve"><div class="card"><h2>Affaire résolue</h2><p style="font-size:2rem;color:var(--accent)">Score : ${p.score.total} / 100</p>
      <ul>${p.score.breakdown.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
      <h3>Conclusion</h3><p>${esc(c.solution.whatHappened)}</p>
      <button data-act="goto" data-screen="completed">Voir les affaires terminées</button></div></div>`;
  }
  return `<div class="resolve"><h2>Résolution de l'enquête</h2>
    <p class="muted">Répondez aux questions ci-dessous. Vos réponses seront comparées à la solution. En cas d'erreur, vous pourrez reprendre l'enquête sans voir la solution complète.</p>
    <form id="resolveForm">${c.solution.questions.map((q,i)=>`<div class="q"><strong>${i+1}. ${esc(q.prompt)}</strong>
      ${q.options.map(o=>`<label><input type="radio" name="${q.id}" value="${o.id}"> ${esc(o.text)}</label>`).join('')}</div>`).join('')}
      <div class="row"><button type="submit" class="primary">Valider la déduction</button><span class="muted">Tentatives: ${p.attempts}</span></div>
    </form>
    <div id="resolveResult" style="margin-top:12px"></div></div>`;
}

let boardDrag: {id:string, ox:number, oy:number, startX:number, startY:number, moved:boolean} | null = null;
let boardPan: {sx:number, sy:number, ox:number, oy:number, moved:boolean} | null = null;
let edgeFrom: string | null = null;

function bindEvents() {
  root.onclick = (e) => {
    const t = (e.target as HTMLElement).closest('[data-act]') as HTMLElement | null;
    if (!t) return;
    const act = t.dataset.act;
    if (act === 'goto') setScreen(t.dataset.screen as any);
    else if (act === 'open-case') openCase(t.dataset.id!);
    else if (act === 'start-case') { const p = progress()!; if(!p.visitedLocations.length) { visitLocation(activeCase()!.locations[0].id); } state.screen='case'; emit(); }
    else if (act === 'tab') { state.caseTab = t.dataset.tab as any; emit(); }
    else if (act === 'loc') { visitLocation(t.dataset.id!); }
    else if (act === 'hotspot') handleHotspot(t.dataset.loc!, t.dataset.hid!);
    else if (act === 'sel-clue') { state.selectedClueId = t.dataset.id; emit(); }
    else if (act === 'char') { state.activeCharacterId = t.dataset.id; emit(); setTimeout(()=>{ const d=document.getElementById('dlog'); if(d) d.scrollTop=d.scrollHeight; },0); }
    else if (act === 'ask') handleAsk(t.dataset.char!, t.dataset.opt!);
    else if (act === 'add-board') addBoardNode(t.dataset.kind!);
    else if (act === 'edge-from') { edgeFrom = t.dataset.id!; state.notice = 'Sélectionnez un autre élément pour créer un lien.'; emit(); setTimeout(()=>{state.notice=undefined; emit();},1800); }
    else if (act === 'del-node') deleteBoardNode(t.dataset.id!);
    else if (act === 'clear-edges') { const p=progress()!; p.board.edges=[]; markDirty(); emit(); }
    else if (act === 'zoom') { const p=progress()!; p.board.zoom = Math.min(2, Math.max(0.4, p.board.zoom + (t.dataset.dir==='in'?0.1:-0.1))); markDirty(); emit(); }
    else if (act === 'tl-move') moveTimeline(t.dataset.id!, t.dataset.dir as any);
    else if (act === 'textsize') { state.save.settings.textSize = t.dataset.v as any; document.documentElement.style.fontSize = state.save.settings.textSize==='large'?'18px':'16px'; markDirty(); emit(); }
    else if (act === 'reset-save') { if(confirm('Réinitialiser toutes les sauvegardes ?')) { state.save = resetSlot(); dialogueStateClear(); setScreen('menu'); } }
  };

  const form = document.getElementById('resolveForm') as HTMLFormElement | null;
  if (form) form.onsubmit = (e) => { e.preventDefault(); submitResolution(form); };

  const boardWrap = document.getElementById('boardWrap');
  const boardCanvas = document.getElementById('boardCanvas');
  if (boardWrap && boardCanvas) bindBoard(boardWrap as HTMLElement, boardCanvas as HTMLElement);

  // note inputs
  root.querySelectorAll('textarea[data-note]').forEach(el => {
    (el as HTMLTextAreaElement).onchange = () => {
      const id = (el as HTMLTextAreaElement).dataset.note!;
      const p = progress()!; const n = p.board.nodes.find(x=>x.id===id) as any;
      if (n) { n.text = (el as HTMLTextAreaElement).value; markDirty(); }
    };
  });

  document.documentElement.style.fontSize = state.save.settings.textSize==='large'?'18px':'16px';
}

function dialogueStateClear(){ for(const k of Object.keys(dialogueState)) delete dialogueState[k]; }

function handleHotspot(locId: string, hid: string) {
  const c = activeCase()!; const p = progress()!;
  const loc = c.locations.find(l=>l.id===locId)!; const h = loc.hotspots.find(x=>x.id===hid)!;
  let msg = `${h.label}: ${h.description}`;
  let foundNew = false;
  if (h.clueId && !p.discoveredClues.includes(h.clueId)) {
    if (discoverClue(h.clueId)) { foundNew = true; msg += `\n\nIndice découvert : ${c.clues.find(x=>x.id===h.clueId)?.name}`; }
  }
  if (h.clueId) markDocumentRead(h.clueId);
  if (h.unlocksLocationId) {
    const ul = c.locations.find(l=>l.id===h.unlocksLocationId);
    if (ul && isLocationUnlocked(c, ul.id, progress()!.discoveredClues)) {
      if (!p.visitedLocations.includes(ul.id)) msg += `\n\nNouvelle zone accessible : ${ul.name}`;
    }
  }
  // auto visit location
  if (!p.visitedLocations.includes(locId)) p.visitedLocations.push(locId);
  p.updatedAt = Date.now(); markDirty();
  alert(msg);
  emit();
}

function handleAsk(charId: string, optId: string) {
  const c = activeCase()!; const ch = c.characters.find(x=>x.id===charId)!;
  const ds = getDialogueLog(charId);
  const node = ch.nodes[ds.nodeId] || ch.nodes[ch.startNodeId];
  const opt = node.options.find(o=>o.id===optId); if (!opt) return;
  ds.log.push({who:'me', text: opt.label});
  ds.log.push({who:'npc', text: opt.response});
  if (opt.grantsClueIds) { opt.grantsClueIds.forEach(id=>{ if(discoverClue(id)) state.notice=`Nouvel indice: ${c.clues.find(x=>x.id===id)?.name||id}`; }); }
  if (opt.setsFlags) opt.setsFlags.forEach(addFlag);
  if (opt.nextNodeId) ds.nodeId = opt.nextNodeId;
  markInterviewed(charId);
  markDirty();
  emit();
  setTimeout(()=>{ const d=document.getElementById('dlog'); if(d) d.scrollTop=d.scrollHeight; },0);
  if (state.notice) setTimeout(()=>{state.notice=undefined; emit();},2200);
}

function addBoardNode(kind: string) {
  const c = activeCase()!; const p = progress()!;
  let label = kind === 'note' ? 'Note' : 'élément';
  let refId = '';
  if (kind === 'clue') {
    const avail = c.clues.filter(cl=>p.discoveredClues.includes(cl.id));
    const name = prompt('Nom ou id de la preuve é ajouter (indices découverts):\n' + avail.map(a=>`- ${a.name}`).join('\n'));
    if (!name) return;
    const found = avail.find(a=>a.name.toLowerCase().includes(name.toLowerCase()) || a.id===name);
    if (!found) { alert('Indice non trouvé parmi ceux découverts.'); return; }
    label = found.name; refId = found.id;
  } else if (kind === 'character') {
    const name = prompt('Personnage:\n' + c.characters.map(x=>`- ${x.name}`).join('\n'));
    if (!name) return; const found = c.characters.find(a=>a.name.toLowerCase().includes(name.toLowerCase()));
    if (!found) return; label = found.name; refId = found.id;
  } else if (kind === 'location') {
    const name = prompt('Lieu:\n' + c.locations.map(x=>`- ${x.name}`).join('\n'));
    if (!name) return; const found = c.locations.find(a=>a.name.toLowerCase().includes(name.toLowerCase()));
    if (!found) return; label = found.name; refId = found.id;
  } else if (kind === 'note') {
    const txt = prompt('Texte de la note:') || 'Note'; label = txt.slice(0,24); refId = 'note';
  }
  const id = 'bn_' + Math.random().toString(36).slice(2,8);
  const node: any = { id, refId, kind, x: 80 + (p.board.nodes.length%5)*180, y: 80 + Math.floor(p.board.nodes.length/5)*120, label };
  if (kind==='note') node.text = label;
  p.board.nodes.push(node); markDirty(); emit();
}

function deleteBoardNode(id: string) {
  const p = progress()!;
  p.board.nodes = p.board.nodes.filter(n=>n.id!==id);
  p.board.edges = p.board.edges.filter(e=>e.from!==id && e.to!==id);
  markDirty(); emit();
}

function bindBoard(wrap: HTMLElement, canvas: HTMLElement) {
  // connect on click node when edgeFrom set
  wrap.querySelectorAll('.board-node').forEach(el => {
    const nodeEl = el as HTMLElement;
    nodeEl.onpointerdown = (ev) => {
      if ((ev.target as HTMLElement).closest('button,textarea')) return;
      const id = nodeEl.dataset.node!;
      if (edgeFrom && edgeFrom !== id) {
        const p = progress()!; const eid = 'be_'+Math.random().toString(36).slice(2,8);
        if (!p.board.edges.find(e=> (e.from===edgeFrom&&e.to===id)||(e.from===id&&e.to===edgeFrom))) p.board.edges.push({id:eid, from: edgeFrom, to:id});
        edgeFrom = null; markDirty(); emit(); return;
      }
      boardDrag = { id, ox: nodeEl.offsetLeft, oy: nodeEl.offsetTop, startX: ev.clientX, startY: ev.clientY, moved:false };
      nodeEl.setPointerCapture(ev.pointerId);
    };
    nodeEl.onpointermove = (ev) => {
      if (!boardDrag || boardDrag.id !== nodeEl.dataset.node) return;
      const dx = (ev.clientX - boardDrag.startX) / (progress()!.board.zoom);
      const dy = (ev.clientY - boardDrag.startY) / (progress()!.board.zoom);
      if (Math.abs(dx)+Math.abs(dy)>3) boardDrag.moved = true;
      const p = progress()!; const n = p.board.nodes.find(x=>x.id===boardDrag!.id);
      if (n) { n.x = Math.max(0, boardDrag.ox + dx); n.y = Math.max(0, boardDrag.oy + dy); nodeEl.style.left = n.x+'px'; nodeEl.style.top = n.y+'px'; }
    };
    nodeEl.onpointerup = (ev) => {
      if (boardDrag && boardDrag.id === nodeEl.dataset.node) { markDirty(); boardDrag = null; }
    };
  });

  // pan on background
  wrap.onpointerdown = (ev) => {
    if ((ev.target as HTMLElement).closest('.board-node, .board-toolbar')) return;
    const p = progress()!;
    boardPan = { sx: ev.clientX, sy: ev.clientY, ox: p.board.pan.x, oy: p.board.pan.y, moved:false };
    (wrap as any).setPointerCapture(ev.pointerId);
  };
  wrap.onpointermove = (ev) => {
    if (!boardPan) return;
    const p = progress()!; p.board.pan.x = boardPan.ox + (ev.clientX - boardPan.sx); p.board.pan.y = boardPan.oy + (ev.clientY - boardPan.sy);
    canvas.style.transform = `translate(${p.board.pan.x}px,${p.board.pan.y}px) scale(${p.board.zoom})`;
  };
  wrap.onpointerup = () => { if (boardPan) { markDirty(); boardPan = null; } };
}

function moveTimeline(id: string, dir: 'up'|'down') {
  const p = progress()!; const arr = p.timelineOrder; const i = arr.indexOf(id); if (i<0) return;
  const j = dir==='up'? i-1 : i+1; if (j<0 || j>=arr.length) return;
  [arr[i],arr[j]] = [arr[j],arr[i]]; markDirty(); emit();
}

function submitResolution(form: HTMLFormElement) {
  const c = activeCase()!; const p = progress()!;
  const answers: Record<string,string> = {};
  for (const q of c.solution.questions) {
    const v = (form.querySelector(`input[name="${q.id}"]:checked`) as HTMLInputElement|null)?.value;
    if (!v) { alert('Répondez é toutes les questions.'); return; }
    answers[q.id]=v;
  }
  p.attempts = (p.attempts||0) + 1;
  let correct = 0; const details: string[] = [];
  c.solution.questions.forEach(q=>{ if(answers[q.id]===q.correctOptionId) { correct++; details.push(`? ${q.prompt}`);} else { details.push(`? ${q.prompt}`);} });
  const allCorrect = correct === c.solution.questions.length;
  if (!allCorrect) {
    const res = document.getElementById('resolveResult')!;
    res.innerHTML = `<div class="card" style="border-color:#5a3030"><h3>Déduction incomplète (${correct}/${c.solution.questions.length})</h3>
      <ul>${details.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>
      <p>Certains éléments ne concordent pas. Reprenez léenquéte : explorez les lieux restants, relisez les indices et vérifiez la chronologie. La solution n'est pas révélée.</p>
      <button data-act="tab" data-tab="lieux" class="primary">Retourner sur le terrain</button></div>`;
    markDirty(); persistSave(state.save); emit(); return;
  }
  // score
  const score = computeScore(c,p);
  p.resolved = true; p.score = score; p.updatedAt = Date.now();
  state.save.completed[c.id] = { score, completedAt: Date.now() };
  state.save.stats.casesCompleted = Object.keys(state.save.completed).length;
  markDirty(); persistSave(state.save);
  emit();
}

function computeScore(c: CaseData, p: any): ScoreResult {
  const clueRatio = p.discoveredClues.length / c.clues.length;
  const clues = Math.round(clueRatio * 40);
  const keyFound = c.solution.keyClueIds.filter(id=>p.discoveredClues.includes(id)).length;
  const deductions = Math.round((keyFound / c.solution.keyClueIds.length) * 30);
  // contradictions identified approximated by flags
  const contraFlags = ['contradiction_morel_photo','morel_logs_seen','kader_not_locker','camera_after_22'].filter(f=>p.dialogueFlags.includes(f)).length;
  const contradictions = Math.round((contraFlags/4)*15);
  const hintsPenalty = Math.min(10, (p.hintsUsed||0)*5) + Math.max(0,(p.attempts-1))*3;
  const timeBonus = 10; // simplified
  let total = clues + deductions + contradictions + timeBonus - hintsPenalty;
  total = Math.max(0, Math.min(100, total));
  const breakdown = [
    `Indices découverts: ${p.discoveredClues.length}/${c.clues.length} (+${clues})`,
    `Preuves clés identifiées: ${keyFound}/${c.solution.keyClueIds.length} (+${deductions})`,
    `Contradictions/pistes vérifiées: ${contraFlags}/4 (+${contradictions})`,
    `Tentatives de résolution: ${p.attempts} (pénalité ${Math.max(0,(p.attempts-1))*3})`,
    `Bonus enquéte: +${timeBonus}`
  ];
  return { total, clues, deductions, contradictions, hints: hintsPenalty, time: timeBonus, breakdown };
}
