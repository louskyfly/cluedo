import { state, subscribe, setScreen, openCase, activeCase, progress, visitLocation, discoverClue, markDocumentRead, addFlag, hasClue, hasFlag, markInterviewed, emit, markDirty } from '../engine/state';
import { persistSave, resetSlot, ensureProgress } from '../engine/save';
import { cases, getCase } from '../data/cases';
import { sfx } from '../engine/audio';
import type { CaseData, Clue, Character, BoardNode, BoardEdge, ScoreResult } from '../types';

let root: HTMLElement;
let modal: { title: string; body: string } | null = null;
function showModal(title: string, body: string) { modal = { title, body }; emit(); }

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
  if (modal) html += `<div class="modal-back" data-act="close-modal"><div class="modal" onclick="event.stopPropagation()"><h2 style="margin-top:0">${esc(modal.title)}</h2><div>${modal.body}</div><div style="margin-top:14px"><button class="primary" data-act="close-modal">Fermer</button></div></div></div>`;
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
    <div class="card" style="margin-top:12px"><h3>Effets sonores</h3><p class="muted">Ambiance sonore discrète lors des interactions (clics, découvertes, résolution).</p>
      <div class="row"><button data-act="sound" data-v="on" class="${s.sound?'primary':''}">Activés</button>
      <button data-act="sound" data-v="off" class="${!s.sound?'primary':''}">Désactivés</button></div></div>
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
  if (key === 'hall') return hallScene();
  if (key === 'bureau') return bureauScene();
  if (key === 'info') return infoScene();
  if (key === 'labo') return laboScene();
  if (key === 'archives') return archivesScene();
  const palettes: Record<string,[string,string,string]> = {
    reception:['#161310','#241e18','#3a3126'], room:['#12141b','#1d2230','#2a3448'], corridor:['#121417','#1b2028','#2a3240'], laundry:['#101619','#18262b','#24404a'], parking:['#0e1014','#171b22','#242b36']
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
  if (key==='reception') return `<rect x="160" y="460" width="560" height="220" rx="12" fill="#2a241b" stroke="#4a3d2a"/><rect x="760" y="220" width="260" height="360" fill="#1b2230" stroke="#334"/><rect x="1080" y="520" width="280" height="160" fill="#232018"/><circle cx="360" cy="260" r="60" fill="#d4b06a" opacity=".12"/>`;
  if (key==='room') return `<rect x="180" y="500" width="520" height="180" rx="10" fill="#2a3348"/><rect x="220" y="420" width="440" height="90" fill="#33435a"/><rect x="980" y="180" width="320" height="420" fill="#1b2433" stroke="#334"/><rect x="760" y="520" width="160" height="160" fill="#232a3a"/>`;
  if (key==='corridor') return `<rect x="120" y="180" width="1360" height="520" fill="#1a202a" stroke="#2f3948"/><rect x="260" y="220" width="180" height="440" fill="#202838"/><rect x="980" y="220" width="220" height="440" fill="#202838"/><rect x="520" y="560" width="360" height="120" fill="#2a3340"/>`;
  if (key==='laundry') return `<rect x="140" y="360" width="260" height="300" rx="10" fill="#22323a"/><rect x="440" y="360" width="260" height="300" rx="10" fill="#22323a"/><rect x="760" y="420" width="520" height="60" fill="#2b3f48"/><rect x="820" y="220" width="360" height="160" fill="#1b2a30"/>`;
  if (key==='parking') return `<rect x="100" y="560" width="1400" height="180" fill="#1b2028"/><rect x="180" y="240" width="360" height="260" fill="#222832" stroke="#39414d"/><rect x="980" y="300" width="420" height="220" fill="#1f2530"/><rect x="620" y="520" width="200" height="60" fill="#2a313d"/>`;
  return '';
}

function hallScene() {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hallWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2230"/><stop offset="1" stop-color="#10141d"/></linearGradient>
    <linearGradient id="hallFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f3a"/><stop offset="1" stop-color="#171a22"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7aa2c8" stop-opacity=".25"/><stop offset="1" stop-color="#d4e6f7" stop-opacity=".05"/></linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b778a"/><stop offset="1" stop-color="#3a424f"/></linearGradient>
    <filter id="vign"><feRadialGradient id="rg" cx="50%" cy="45%" r="70%"><stop offset="60%" stop-color="white"/><stop offset="100%" stop-color="black"/></feRadialGradient><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>
  </defs>
  <rect width="1600" height="900" fill="url(#hallWall)"/>
  <rect x="0" y="560" width="1600" height="340" fill="url(#hallFloor)"/>
  <g opacity=".25" stroke="#4a5568" stroke-width="2"><line x1="0" y1="560" x2="400" y2="900"/><line x1="200" y1="560" x2="520" y2="900"/><line x1="400" y1="560" x2="660" y2="900"/><line x1="600" y1="560" x2="800" y2="900"/><line x1="800" y1="560" x2="940" y2="900"/><line x1="1000" y1="560" x2="1080" y2="900"/><line x1="1200" y1="560" x2="1220" y2="900"/><line x1="1400" y1="560" x2="1360" y2="900"/></g>
  <!-- back wall panels -->
  <rect x="80" y="120" width="1440" height="460" rx="8" fill="#141a26" stroke="#283244"/>
  <!-- glass entrance left -->
  <rect x="120" y="160" width="360" height="400" rx="6" fill="url(#glass)" stroke="#5f7f99"/>
  <line x1="300" y1="160" x2="300" y2="560" stroke="#5f7f99"/><line x1="120" y1="360" x2="480" y2="360" stroke="#5f7f99"/>
  <!-- corridor door center -->
  <rect x="700" y="200" width="260" height="360" rx="8" fill="#1c2433" stroke="#3a4a63"/>
  <rect x="720" y="220" width="220" height="320" rx="4" fill="#101723"/>
  <rect x="760" y="260" width="140" height="180" rx="4" fill="#0b1220" stroke="#2a3a52"/>
  <text x="830" y="360" text-anchor="middle" fill="#7aa2c8" font-size="18" font-family="Segoe UI">ACCÈS</text>
  <text x="830" y="385" text-anchor="middle" fill="#7aa2c8" font-size="18" font-family="Segoe UI">LABOS</text>
  <circle cx="930" cy="410" r="6" fill="#d4b06a"/>
  <!-- security desk -->
  <rect x="980" y="430" width="520" height="160" rx="10" fill="#232b3a" stroke="#3b495f"/>
  <rect x="980" y="430" width="520" height="26" rx="10" fill="#2e394c"/>
  <rect x="1010" y="470" width="180" height="90" rx="6" fill="#121824" stroke="#2a3550"/>
  <rect x="1025" y="485" width="150" height="60" rx="4" fill="#0a2030"/>
  <!-- badge reader on desk -->
  <rect x="990" y="420" width="70" height="90" rx="6" fill="url(#metal)" stroke="#556"/>
  <rect x="1005" y="438" width="40" height="55" rx="4" fill="#101820"/>
  <circle cx="1025" cy="470" r="6" fill="#39d98a"/>
  <!-- mail/envelope on desk -->
  <rect x="620" y="455" width="120" height="70" rx="4" fill="#e8e0cf" transform="rotate(-6 680 490)"/>
  <line x1="620" y1="470" x2="740" y2="500" stroke="#b9a98a" transform="rotate(-6 680 490)"/>
  <!-- camera top right -->
  <g transform="translate(1240,150)">
    <rect x="-30" y="20" width="60" height="30" rx="4" fill="#2b3444" stroke="#445"/>
    <circle cx="0" cy="35" r="10" fill="#0b1220" stroke="#7aa2c8"/>
    <circle cx="0" cy="35" r="4" fill="#39d98a"/>
    <rect x="-6" y="-10" width="12" height="30" fill="#3a4558"/>
    <rect x="-20" y="-18" width="40" height="12" rx="4" fill="#2b3444"/>
  </g>
  <!-- umbrella stand left -->
  <rect x="250" y="520" width="90" height="140" rx="10" fill="#1f2736" stroke="#3a465c"/>
  <ellipse cx="295" cy="520" rx="50" ry="12" fill="#283244"/>
  <line x1="280" y1="380" x2="300" y2="540" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
  <path d="M230 390 Q300 340 370 390" fill="none" stroke="#1c1c1c" stroke-width="8"/>
  <path d="M230 390 Q300 360 370 390" fill="#202020" opacity=".9"/>
  <ellipse cx="300" cy="545" rx="30" ry="6" fill="#4a7a9a" opacity=".35"/>
  <!-- lighting -->
  <ellipse cx="830" cy="140" rx="420" ry="60" fill="#d4b06a" opacity=".08"/>
  <rect width="1600" height="900" fill="url(#vign)" opacity=".15"/>
  </svg>`;
}

function bureauScene() {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1916"/><stop offset="1" stop-color="#120f0d"/></linearGradient>
    <linearGradient id="bFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3026"/><stop offset="1" stop-color="#201a14"/></linearGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4634"/><stop offset="1" stop-color="#3a2d21"/></linearGradient>
    <linearGradient id="screenG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f2230"/><stop offset="1" stop-color="#09131b"/></linearGradient>
    <pattern id="woodGrain" width="20" height="20" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="20" y2="20" stroke="#000" opacity=".05"/></pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#bWall)"/>
  <rect x="0" y="600" width="1600" height="300" fill="url(#bFloor)"/>
  <g opacity=".2" stroke="#000" stroke-width="2">` + Array.from({length:16},(_,i)=>`<line x1="${i*110}" y1="600" x2="${i*110-120}" y2="900"/>`).join('') + `</g>
  <!-- window/blinds -->
  <rect x="1020" y="120" width="420" height="360" rx="6" fill="#0e1622" stroke="#39485c"/>
  <g opacity=".35" stroke="#6b7f99">` + Array.from({length:10},(_,i)=>`<line x1="1040" y1="${150+i*30}" x2="1420" y2="${150+i*30}"/>`).join('') + `</g>
  <!-- bookshelf/cabinet right -->
  <rect x="1180" y="500" width="300" height="280" fill="#2a2119" stroke="#443628"/>
  <rect x="1200" y="520" width="260" height="70" fill="#201913"/><rect x="1200" y="605" width="260" height="70" fill="#201913"/><rect x="1200" y="690" width="260" height="70" fill="#201913"/>
  <!-- desk -->
  <rect x="360" y="520" width="760" height="40" rx="6" fill="url(#wood)"/>
  <rect x="360" y="520" width="760" height="40" rx="6" fill="url(#woodGrain)" opacity=".4"/>
  <rect x="420" y="560" width="50" height="240" fill="#33281e"/><rect x="1010" y="560" width="50" height="240" fill="#33281e"/>
  <!-- drawer unit (entrouvert) -->
  <rect x="820" y="560" width="240" height="240" fill="#3a2d21" stroke="#2a2017"/>
  <rect x="840" y="580" width="200" height="60" fill="#33271d"/><rect x="840" y="655" width="200" height="60" fill="#33271d"/>
  <rect x="855" y="730" width="200" height="60" fill="#2f241b" stroke="#d4b06a" stroke-opacity=".4"/>
  <rect x="870" y="742" width="170" height="36" fill="#14100d" opacity=".8"/>
  <!-- laptop -->
  <rect x="640" y="470" width="200" height="130" rx="6" fill="#1a1f28" stroke="#3a4558"/>
  <rect x="655" y="485" width="170" height="95" rx="4" fill="url(#screenG)"/>
  <rect x="600" y="600" width="280" height="18" rx="4" fill="#222833"/>
  <!-- post-it on laptop area -->
  <rect x="860" y="500" width="70" height="60" fill="#f2d96b" transform="rotate(6 895 530)"/>
  <g transform="rotate(6 895 530)" fill="#5a4a10" font-size="10" font-family="Segoe UI"><text x="868" y="522">Sauvegarde</text><text x="878" y="536">coffre</text><text x="888" y="550">23h</text></g>
  <!-- chair renversée -->
  <g transform="translate(720,620) rotate(78)">
    <rect x="-40" y="-120" width="80" height="90" rx="8" fill="#243044" stroke="#3a4a63"/>
    <rect x="-50" y="-30" width="100" height="18" rx="6" fill="#2b3850"/>
    <rect x="-35" y="-12" width="12" height="90" fill="#2a3444"/><rect x="23" y="-12" width="12" height="90" fill="#2a3444"/>
  </g>
  <!-- calendar on wall left -->
  <rect x="260" y="170" width="170" height="190" fill="#f4f1e8" stroke="#cfc7b6"/>
  <rect x="260" y="170" width="170" height="34" fill="#b84a3a"/>
  <text x="345" y="194" text-anchor="middle" fill="#fff" font-size="16" font-family="Segoe UI">OCTOBRE</text>
  <g fill="#333" font-size="12" font-family="Segoe UI">` + [ [300,240,'6'],[330,240,'7'],[360,240,'8'],[390,240,'9'],[300,270,'13'] ].map(([x,y,t])=>`<text x="${x}" y="${y}">${t}</text>`).join('') + `</g>
  <circle cx="300" cy="266" r="16" fill="none" stroke="#c43" stroke-width="3"/>
  <text x="345" y="330" text-anchor="middle" fill="#a33" font-size="11" font-family="Segoe UI">Livraison N.</text>
  <!-- framed photo -->
  <rect x="450" y="360" width="120" height="150" fill="#2a2119" stroke="#6b563f" stroke-width="4"/>
  <rect x="462" y="372" width="96" height="110" fill="#1a2433"/>
  <circle cx="490" cy="410" r="14" fill="#6b7f99"/><circle cx="530" cy="415" r="14" fill="#7a8fa8"/><rect x="475" y="432" width="70" height="30" rx="6" fill="#223044"/>
  <ellipse cx="790" cy="140" rx="360" ry="70" fill="#d4b06a" opacity=".07"/>
  </svg>`;
}

function infoScene() {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1620"/><stop offset="1" stop-color="#081018"/></linearGradient>
    <linearGradient id="iFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2633"/><stop offset="1" stop-color="#0f1722"/></linearGradient>
    <linearGradient id="rack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1b2430"/><stop offset="1" stop-color="#121923"/></linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#iWall)"/>
  <rect x="0" y="620" width="1600" height="280" fill="url(#iFloor)"/>
  <g opacity=".15" stroke="#3a556a">` + Array.from({length:20},(_,i)=>`<line x1="${i*90}" y1="620" x2="${i*90-60}" y2="900"/>`).join('') + `</g>
  <!-- server racks -->
  ${[140,320,1320].map(x=>`<rect x="${x}" y="160" width="150" height="470" rx="8" fill="url(#rack)" stroke="#2f4155"/>
  <g>${Array.from({length:14},(_,i)=>`<rect x="${x+15}" y="${185+i*32}" width="120" height="18" rx="3" fill="#0b1220"/><circle cx="${x+28}" cy="${194+i*32}" r="3" fill="${i%3===0?'#39d98a':i%3===1?'#39d98a':'#d4b06a'}" opacity=".9"/>`).join('')}</g>`).join('')}
  <!-- desk with monitors -->
  <rect x="520" y="520" width="620" height="30" rx="6" fill="#2a3444"/>
  <rect x="560" y="550" width="30" height="160" fill="#222b38"/><rect x="1070" y="550" width="30" height="160" fill="#222b38"/>
  <!-- logs monitor -->
  <rect x="540" y="300" width="260" height="210" rx="8" fill="#141c28" stroke="#33485e"/>
  <rect x="555" y="318" width="230" height="160" rx="4" fill="#061018"/>
  <g fill="#39d98a" font-size="11" font-family="Consolas, monospace" opacity=".9">
    <text x="565" y="340">22:41 evasseur login</text><text x="565" y="360">22:47 copy NOIR-01 4.2GB</text><text x="565" y="380">22:53 purge partial</text><text x="565" y="400">23:05 lmorel view logs</text><text x="565" y="420">23:09 lmorel logout</text>
  </g>
  <!-- camera feeds monitor -->
  <rect x="830" y="280" width="280" height="230" rx="8" fill="#141c28" stroke="#33485e"/>
  <rect x="845" y="298" width="250" height="170" rx="4" fill="#050b12"/>
  <rect x="855" y="308" width="110" height="70" fill="#0b1620" stroke="#203040"/><rect x="975" y="308" width="110" height="70" fill="#0b1620" stroke="#203040"/>
  <rect x="855" y="388" width="110" height="70" fill="#101010" stroke="#402020"/><rect x="975" y="388" width="110" height="70" fill="#0b1620" stroke="#203040"/>
  <text x="910" y="430" text-anchor="middle" fill="#c75c5c" font-size="12" font-family="Segoe UI">NO SIGNAL</text>
  <text x="910" y="448" text-anchor="middle" fill="#c75c5c" font-size="10" font-family="Segoe UI">22:00-23:00</text>
  <!-- USB under desk area -->
  <rect x="820" y="700" width="46" height="18" rx="3" fill="#111" stroke="#444"/>
  <rect x="862" y="704" width="14" height="10" fill="#667"/>
  <!-- trash bin with paper -->
  <g transform="translate(340,640)">
    <path d="M0 0 h90 l-10 120 h-70 z" fill="#2a3444" stroke="#3f4f63"/>
    <ellipse cx="45" cy="0" rx="45" ry="12" fill="#334155"/>
    <rect x="18" y="-18" width="54" height="30" rx="4" fill="#efe6d2" transform="rotate(-18 45 -3)"/>
  </g>
  <ellipse cx="800" cy="140" rx="500" ry="80" fill="#39d98a" opacity=".05"/>
  </svg>`;
}

function laboScene() {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6edf2"/><stop offset="1" stop-color="#c9d6df"/></linearGradient>
    <linearGradient id="lFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8c7d3"/><stop offset="1" stop-color="#93a6b5"/></linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8ee"/><stop offset="1" stop-color="#aebfcb"/></linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#lWall)"/>
  <rect x="0" y="620" width="1600" height="280" fill="url(#lFloor)"/>
  <g opacity=".25" stroke="#fff">` + Array.from({length:10},(_,i)=>`<rect x="${120+i*150}" y="620" width="140" height="140" fill="none"/>`).join('') + `</g>
  <!-- central bench -->
  <rect x="120" y="470" width="1100" height="40" rx="6" fill="url(#steel)" stroke="#8fa3b2"/>
  <rect x="160" y="510" width="40" height="220" fill="#8fa3b2"/><rect x="520" y="510" width="40" height="220" fill="#8fa3b2"/><rect x="880" y="510" width="40" height="220" fill="#8fa3b2"/><rect x="1140" y="510" width="40" height="220" fill="#8fa3b2"/>
  <!-- glassware / broken glass area -->
  <g transform="translate(430,560)">
    <circle cx="0" cy="0" r="26" fill="#cfe8f5" stroke="#8fb7cc"/>
    <rect x="-6" y="-50" width="12" height="30" fill="#cfe8f5" stroke="#8fb7cc"/>
    <polygon points="40,10 60,-5 75,20 55,25" fill="#d9eef8" opacity=".8" stroke="#9fc4d6"/>
    <polygon points="70,5 85,15 78,30" fill="#d9eef8" opacity=".7" stroke="#9fc4d6"/>
  </g>
  <!-- sample shelf -->
  <rect x="860" y="180" width="300" height="260" fill="#d7e2ea" stroke="#9fb2bf"/>
  ${Array.from({length:4},(_,r)=>Array.from({length:6},(_,c)=>`<rect x="${880+c*44}" y="${205+r*55}" width="26" height="40" rx="4" fill="${r===1&&c===4?'#eef6ff':'#bfe0f2'}" stroke="#7fa9bf" ${r===1&&c===4?'opacity=".25"':''}/>`).join('')).join('')}
  <text x="1010" y="170" text-anchor="middle" fill="#567" font-size="16" font-family="Segoe UI">ÉCHANTILLONS</text>
  <text x="1088" y="285" fill="#c75c5c" font-size="12" font-family="Segoe UI">NX-17 manquant</text>
  <!-- coat rack / blouse -->
  <rect x="180" y="240" width="20" height="380" fill="#8fa3b2"/>
  <rect x="140" y="240" width="100" height="16" rx="6" fill="#8fa3b2"/>
  <path d="M170 300 l40 -20 h60 l40 20 v160 q-70 30 -140 0 z" fill="#f4f8fb" stroke="#c7d5df"/>
  <rect x="235" y="360" width="40" height="26" rx="4" fill="#fff" stroke="#ccd"/>
  <text x="255" y="378" text-anchor="middle" fill="#334" font-size="8" font-family="Segoe UI">N. Bernard</text>
  <circle cx="245" cy="420" r="10" fill="#c9a46a" opacity=".6"/>
  <!-- service door right -->
  <rect x="1280" y="220" width="220" height="420" rx="6" fill="#cfdbe4" stroke="#8fa3b2"/>
  <rect x="1305" y="250" width="170" height="360" rx="4" fill="#b8c9d6"/>
  <rect x="1440" y="430" width="18" height="50" rx="6" fill="#7f95a6"/>
  <rect x="1318" y="430" width="8" height="60" fill="#7f95a6" opacity=".7"/>
  <text x="1390" y="620" text-anchor="middle" fill="#567" font-size="16" font-family="Segoe UI">PORTE SERVICE</text>
  <!-- fume hood -->
  <rect x="420" y="180" width="260" height="220" fill="#dfe9ef" stroke="#a9bcc9"/>
  <rect x="445" y="210" width="210" height="150" fill="#b7d0de" opacity=".5" stroke="#9fb6c6"/>
  <ellipse cx="800" cy="120" rx="520" ry="70" fill="#ffffff" opacity=".35"/>
  </svg>`;
}

function archivesScene() {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="aWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1713"/><stop offset="1" stop-color="#100e0b"/></linearGradient>
    <linearGradient id="aFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2620"/><stop offset="1" stop-color="#171410"/></linearGradient>
    <linearGradient id="metalCab" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#50565e"/><stop offset="1" stop-color="#3a4047"/></linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#aWall)"/>
  <rect x="0" y="620" width="1600" height="280" fill="url(#aFloor)"/>
  <g opacity=".2" stroke="#000">` + Array.from({length:12},(_,i)=>`<line x1="${i*150}" y1="620" x2="${i*150-80}" y2="900"/>`).join('') + `</g>
  <!-- cabinets rows -->
  ${[120,320,520,1180].map(x=>`<rect x="${x}" y="140" width="170" height="500" rx="6" fill="url(#metalCab)" stroke="#2a2f35"/>
  ${Array.from({length:5},(_,i)=>`<rect x="${x+15}" y="${165+i*95}" width="140" height="70" rx="4" fill="#454b53" stroke="#2f343a"/><rect x="${x+70}" y="${195+i*95}" width="30" height="8" rx="3" fill="#8a9098"/>`).join('')}` ).join('')}
  <!-- gap / missing folder area -->
  <rect x="900" y="160" width="220" height="460" rx="6" fill="url(#metalCab)" stroke="#2a2f35"/>
  ${[0,1,3,4].map(i=>`<rect x="915" y="${185+i*90}" width="190" height="65" rx="4" fill="#454b53" stroke="#2f343a"/><rect x="995" y="${212+i*90}" width="30" height="8" rx="3" fill="#8a9098"/>`).join('')}
  <rect x="915" y="365" width="190" height="65" rx="4" fill="#141210" stroke="#d4b06a" stroke-opacity=".35"/>
  <text x="1010" y="404" text-anchor="middle" fill="#d4b06a" font-size="14" font-family="Segoe UI">DOSSIER NX</text>
  <!-- moved box on floor -->
  <g transform="translate(500,560)">
    <rect x="0" y="40" width="220" height="120" fill="#6b5842" stroke="#4a3c2d"/>
    <rect x="10" y="50" width="200" height="100" fill="#7a654c"/>
    <path d="M0 40 l30 -30 h220 l-30 30 z" fill="#806c52" stroke="#4a3c2d"/>
    <text x="110" y="115" text-anchor="middle" fill="#f0e6d2" font-size="16" font-family="Segoe UI">PROJET NÉMÉSIS</text>
    <rect x="220" y="70" width="40" height="90" fill="#1f1b16" opacity=".25"/>
  </g>
  <!-- dust-free trace -->
  <rect x="720" y="650" width="120" height="40" fill="#2f2a23" opacity=".35" rx="4"/>
  <!-- hidden note behind cabinet area -->
  <rect x="300" y="320" width="60" height="50" fill="#f4f1e8" transform="rotate(-8 330 345)"/>
  <line x1="308" y1="335" x2="350" y2="332" stroke="#b8b0a0" transform="rotate(-8 330 345)"/>
  <line x1="308" y1="345" x2="348" y2="342" stroke="#b8b0a0" transform="rotate(-8 330 345)"/>
  <!-- hanging lamp light -->
  <ellipse cx="800" cy="120" rx="420" ry="90" fill="#d4b06a" opacity=".08"/>
  <rect x="790" y="80" width="20" height="60" fill="#444"/>
  <path d="M740 140 h120 l-20 30 h-80 z" fill="#5a503f"/>
  </svg>`;
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
    else if (act === 'close-modal') { modal = null; emit(); }
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
    else if (act === 'sound') { state.save.settings.sound = t.dataset.v === 'on'; markDirty(); emit(); }
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
  let body = `<p>${esc(h.description)}</p>`;
  if (h.clueId && !p.discoveredClues.includes(h.clueId)) {
    if (discoverClue(h.clueId)) {
      const cl = c.clues.find(x=>x.id===h.clueId);
      if (cl) body += `<div class="card" style="margin-top:10px;border-color:var(--accent)"><div class="badge ok">Nouvel indice</div><h3 style="margin:6px 0">${cl.illustration} ${esc(cl.name)}</h3><p class="muted">${esc(cl.description)}</p>${cl.documentText?`<div class="doc" style="margin-top:8px">${esc(cl.documentText)}</div>`:''}</div>`;
      state.notice = cl ? `Nouvel indice: ${cl.name}` : 'Nouvel indice découvert';
      sfx('discover', state.save.settings.sound);
      setTimeout(()=>{state.notice=undefined; emit();},2200);
    } else { sfx('click', state.save.settings.sound); }
  } else {
    if (h.clueId) { const cl = c.clues.find(x=>x.id===h.clueId); if (cl) body += `<p class="muted" style="margin-top:8px">Indice déjà relevé : <strong>${esc(cl.name)}</strong></p>`; }
    sfx('click', state.save.settings.sound);
  }
  if (h.clueId) markDocumentRead(h.clueId);
  if (h.unlocksLocationId) {
    const ul = c.locations.find(l=>l.id===h.unlocksLocationId);
    if (ul && isLocationUnlocked(c, ul.id, progress()!.discoveredClues)) {
      body += `<p style="margin-top:10px;color:var(--accent)">Nouvelle zone accessible : <strong>${esc(ul.name)}</strong></p>`;
    }
  }
  if (h.zoomText) body += `<p class="muted" style="margin-top:8px">${esc(h.zoomText)}</p>`;
  if (!p.visitedLocations.includes(locId)) p.visitedLocations.push(locId);
  p.updatedAt = Date.now(); markDirty();
  showModal(h.label, body);
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
    const name = prompt('Nom de la preuve à ajouter (indices découverts):\n' + avail.map(a=>`- ${a.name}`).join('\n'));
    if (!name) return;
    const found = avail.find(a=>a.name.toLowerCase().includes(name.toLowerCase()) || a.id===name);
    if (!found) { state.notice = 'Indice non trouvé parmi ceux découverts.'; emit(); setTimeout(()=>{state.notice=undefined; emit();},2000); return; }
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
      if (n) { n.x = Math.max(0, boardDrag.ox + dx); n.y = Math.max(0, boardDrag.oy + dy); nodeEl.style.left = n.x+'px'; nodeEl.style.top = n.y+'px'; refreshBoardEdges(p); }
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

function refreshBoardEdges(p: any) {
  const svg = document.querySelector('.board-svg');
  if (!svg) return;
  svg.innerHTML = p.board.edges.map((e: any)=>{ const a=p.board.nodes.find((n:any)=>n.id===e.from), d=p.board.nodes.find((n:any)=>n.id===e.to); if(!a||!d) return ''; const x1=a.x+90,y1=a.y+30,x2=d.x+90,y2=d.y+30; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d4b06a" stroke-width="2" opacity="0.7"/>`; }).join('');
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
    if (!v) { state.notice = 'Répondez à toutes les questions.'; emit(); setTimeout(()=>{state.notice=undefined; emit();},2000); return; }
    answers[q.id]=v;
  }
  p.attempts = (p.attempts||0) + 1;
  let correct = 0; const details: string[] = [];
  c.solution.questions.forEach(q=>{ if(answers[q.id]===q.correctOptionId) { correct++; details.push(`✔ ${q.prompt}`);} else { details.push(`✘ ${q.prompt}`);} });
  const allCorrect = correct === c.solution.questions.length;
  if (!allCorrect) {
    sfx('error', state.save.settings.sound);
    const res = document.getElementById('resolveResult')!;
    res.innerHTML = `<div class="card" style="border-color:#5a3030"><h3>Déduction incomplète (${correct}/${c.solution.questions.length})</h3>
      <ul>${details.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>
      <p>Certains éléments ne concordent pas. Reprenez l’enquête : explorez les lieux restants, relisez les indices et vérifiez la chronologie. La solution n’est pas révélée.</p>
      <button data-act="tab" data-tab="lieux" class="primary">Retourner sur le terrain</button></div>`;
    markDirty(); persistSave(state.save); emit(); return;
  }
  // score
  const score = computeScore(c,p);
  p.resolved = true; p.score = score; p.updatedAt = Date.now();
  state.save.completed[c.id] = { score, completedAt: Date.now() };
  state.save.stats.casesCompleted = Object.keys(state.save.completed).length;
  sfx('success', state.save.settings.sound);
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
    `Bonus enquête: +${timeBonus}`
  ];
  return { total, clues, deductions, contradictions, hints: hintsPenalty, time: timeBonus, breakdown };
}
