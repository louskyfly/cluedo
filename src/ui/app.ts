import { state, subscribe, setScreen, openCase, activeCase, progress, visitLocation, discoverClue, markDocumentRead, addFlag, hasClue, hasFlag, markInterviewed, emit, markDirty } from '../engine/state';
import { persistSave, resetSlot, ensureProgress } from '../engine/save';
import { cases, getCase } from '../data/cases';
import { sfx } from '../engine/audio';
import { renderSceneArt, sceneMeta } from './scenes';
import { menuArt } from './scenes/menu';
import { caseCoverArt } from './scenes/covers';
import { icon, avatar, categoryIcon } from './icons';
import type { CaseData, Clue, Character, BoardNode, BoardEdge, ScoreResult } from '../types';

let root: HTMLElement;
let modal: { title: string; body: string; sub?: string } | null = null;
let clueFilter = 'tous';
let boardPickKind: 'clue' | 'character' | 'location' | 'note' = 'clue';
const objectiveCache: Record<string, string[]> = {};
function showModal(title: string, body: string, sub?: string) { modal = { title, body, sub }; emit(); }

function objectiveList(c: CaseData, p: any) {
  return (c.objectives || []).map(o => ({ ...o, done: o.check(p) }));
}

function checkObjectives() {
  const c = activeCase(); const p = progress();
  if (!c || !p || !c.objectives) return;
  const done = c.objectives.filter(o => o.check(p)).map(o => o.id);
  if (!objectiveCache[c.id]) { objectiveCache[c.id] = done; return; }
  const newly = done.filter(id => !objectiveCache[c.id].includes(id));
  objectiveCache[c.id] = done;
  if (newly.length) {
    const o = c.objectives.find(x => x.id === newly[0]);
    if (o) {
      state.notice = `Objectif atteint · ${o.title}`;
      sfx('discover', state.save.settings.sound);
      setTimeout(() => { state.notice = undefined; emit(); }, 2800);
    }
  }
}

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
  if (s.notice) html += `<div class="toast"><span class="ti">${icon('check', 16)}</span><span>${esc(s.notice)}</span></div>`;
  if (modal) html += `<div class="modal-back" data-act="close-modal"><div class="modal" data-act="noop">
    <div class="modal-head"><div><h2>${esc(modal.title)}</h2>${modal.sub ? `<div class="sub">${esc(modal.sub)}</div>` : ''}</div><button class="icon-btn" data-act="close-modal" aria-label="Fermer">${icon('x', 18)}</button></div>
    <div class="modal-body">${modal.body}</div>
    <div class="modal-foot"><button class="btn" data-act="close-modal">Fermer</button></div>
  </div></div>`;
  root.innerHTML = html;
  bindEvents();
}

function esc(s: string) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!)); }

function menuScreen() {
  const hasContinue = Object.keys(state.save.cases).length > 0;
  const featured = cases.find(c => c.locations.length > 0) || cases[0];
  const ongoing = Object.values(state.save.cases).sort((a, b) => b.updatedAt - a.updatedAt)[0];
  return `<div class="menu">
    <div class="menu-art">${menuArt()}</div>
    <div class="menu-shade"></div>
    <div class="menu-inner">
      <div class="menu-head">
        <div class="menu-brand"><div class="mark">${icon('search', 22)}</div><div class="name">Detective · Classified Cases</div></div>
        <div class="meta gold" style="border-radius:999px;padding:6px 12px">${icon('lock', 13)} Dossiers confidentiels</div>
      </div>
      <div class="menu-main">
        <div class="menu-copy">
          <div class="menu-kicker">Une aventure d’investigation narrative</div>
          <h1 class="menu-title">DETECTIVE<br><em>CLASSIFIED</em> CASES</h1>
          <p class="menu-sub">Chaque dossier est une histoire. Explorez les lieux, interrogez les témoins, confrontez les preuves et reconstituez la vérité — avant que la nuit ne referme ses portes.</p>
          <div class="menu-actions">
            <button class="menu-btn primary" data-act="goto" data-screen="dossiers">
              <span class="mi">${icon('folder', 19)}</span><span class="mt"><strong>Nouvelle enquête</strong><span>Ouvrir un dossier confidentiel</span></span><span class="chev">${icon('chevronRight', 16)}</span>
            </button>
            <button class="menu-btn" data-act="continue" ${!hasContinue ? 'disabled' : ''}>
              <span class="mi">${icon('play', 18)}</span><span class="mt"><strong>Continuer</strong><span>${ongoing ? 'Reprendre la dernière affaire en cours' : 'Aucune enquête commencée'}</span></span><span class="chev">${icon('chevronRight', 16)}</span>
            </button>
            <button class="menu-btn" data-act="goto" data-screen="completed">
              <span class="mi">${icon('check', 19)}</span><span class="mt"><strong>Affaires terminées</strong><span>${state.save.stats.casesCompleted} dossier${state.save.stats.casesCompleted > 1 ? 's' : ''} classé${state.save.stats.casesCompleted > 1 ? 's' : ''}</span></span><span class="chev">${icon('chevronRight', 16)}</span>
            </button>
            <button class="menu-btn" data-act="goto" data-screen="stats">
              <span class="mi">${icon('stats', 18)}</span><span class="mt"><strong>Statistiques</strong><span>Votre carnet de détective</span></span><span class="chev">${icon('chevronRight', 16)}</span>
            </button>
            <button class="menu-btn" data-act="goto" data-screen="settings">
              <span class="mi">${icon('settings', 18)}</span><span class="mt"><strong>Paramètres</strong><span>Confort, audio et sauvegardes</span></span><span class="chev">${icon('chevronRight', 16)}</span>
            </button>
          </div>
        </div>
        <div class="menu-dossier">
          <div class="dossier-card">
            <div class="no"><span>Dossier ${caseNo(featured)}</span><span>${esc(featured.difficulty)}</span></div>
            <div class="dossier-thumb" style="margin-top:14px">${caseCoverArt(featured.id)}<span class="stamp">Confidentiel</span></div>
            <h3>${esc(featured.title)}</h3>
            <p>${esc(featured.description)}</p>
            <div class="meta-row" style="margin-top:12px"><span class="meta">${icon('clock', 12)} ${esc(featured.duration)}</span><span class="meta">${icon('pin', 12)} ${featured.locations.length} lieux</span><span class="meta">${icon('search', 12)} ${featured.clues.length} indices</span></div>
            <button class="btn primary wide" style="margin-top:14px" data-act="open-case" data-id="${featured.id}">Ouvrir le dossier</button>
          </div>
        </div>
      </div>
      <div class="menu-foot">
        <span><i class="dot"></i>Sauvegarde automatique active</span>
        <span class="sep">·</span>
        <span>PWA iPad · mode paysage recommandé</span>
        <span class="sep">·</span>
        <span>v1.0 · Classified Cases</span>
      </div>
    </div>
  </div>`;
}

function caseNo(c: CaseData) {
  const i = cases.findIndex(x => x.id === c.id);
  return String(i + 1).padStart(3, '0');
}

function dossiersScreen(completedOnly: boolean) {
  const list = cases.filter(c => completedOnly ? !!state.save.completed[c.id] : true);
  return `<div class="screen">
    <div class="topbar"><button class="back-btn" data-act="goto" data-screen="menu">${icon('back', 16)}<span>Menu</span></button><div class="title">${completedOnly ? 'Affaires terminées' : 'Dossiers disponibles'}</div><div class="meta">${icon('lock', 13)} Accès restreint</div></div>
    <div class="scroll">
      <div class="page-head"><div><h1>${completedOnly ? 'Affaires classées' : 'Dossiers confidentiels'}</h1><p>${completedOnly ? 'Les enquêtes que vous avez résolues, avec leur bilan.' : 'Choisissez une affaire. Chaque dossier contient ses lieux, ses témoins et ses secrets.'}</p></div><div class="meta gold">${icon('folder', 13)} ${list.length} dossier${list.length > 1 ? 's' : ''}</div></div>
      <div class="grid">${list.map(c => cardCase(c)).join('') || '<p class="muted">Aucune affaire terminée pour le moment.</p>'}</div>
    </div>
  </div>`;
}

function cardCase(c: CaseData) {
  const done = state.save.completed[c.id];
  const prog = state.save.cases[c.id];
  const playable = c.locations.length > 0;
  let status = 'Nouveau';
  let badge = 'meta';
  if (done) { status = `Classée · ${done.score.total}/100`; badge = 'meta green'; }
  else if (prog) { status = `En cours · ${prog.discoveredClues.length} indices`; badge = 'meta gold'; }
  else if (!playable) { status = 'Bientôt disponible'; }
  return `<article class="case-card">
    <div class="case-cover">${caseCoverArt(c.id)}<div class="case-no">DOSSIER ${caseNo(c)}</div><div class="case-status"><span class="${badge}">${esc(status)}</span></div></div>
    <div class="case-body">
      <div class="meta-row"><span class="meta">${icon('clock', 12)} ${esc(c.duration)}</span><span class="meta">${icon('star', 12)} ${esc(c.difficulty)}</span>${playable ? `<span class="meta">${icon('pin', 12)} ${c.locations.length} lieux</span>` : ''}</div>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.description)}</p>
      <div class="case-foot">
        <button class="btn ${playable ? 'primary' : ''}" data-act="${done ? 'replay-case' : 'open-case'}" data-id="${c.id}" ${!playable ? 'disabled' : ''}>${done ? 'Rejouer l’affaire' : prog ? 'Reprendre l’enquête' : 'Ouvrir le dossier'}${icon('chevronRight', 15)}</button>
        ${done ? `<span class="faint" style="font-size:.7rem">Terminée le ${new Date(done.completedAt).toLocaleDateString('fr-FR')}</span>` : ''}
      </div>
    </div>
  </article>`;
}

function statsScreen() {
  const st = state.save.stats; const done = Object.values(state.save.completed);
  const avg = done.length ? Math.round(done.reduce((a, b) => a + b.score.total, 0) / done.length) : 0;
  const totalClues = Object.values(state.save.cases).reduce((a, p) => a + p.discoveredClues.length, 0);
  return `<div class="screen"><div class="topbar"><button class="back-btn" data-act="goto" data-screen="menu">${icon('back', 16)}<span>Menu</span></button><div class="title">Statistiques</div><div></div></div>
  <div class="stats-page">
    <div class="page-head"><div><h1>Carnet de détective</h1><p>Votre parcours, vos affaires et vos résultats.</p></div><div class="meta gold">${icon('stats', 13)} ${st.casesCompleted} classée${st.casesCompleted > 1 ? 's' : ''}</div></div>
    <div class="stat-grid">
      <div class="stat-card"><div class="k">Affaires terminées</div><div class="v">${st.casesCompleted}</div><div class="s">sur ${cases.length} dossiers</div></div>
      <div class="stat-card"><div class="k">Score moyen</div><div class="v">${avg}</div><div class="s">sur 100</div></div>
      <div class="stat-card"><div class="k">Affaires en cours</div><div class="v">${Object.keys(state.save.cases).filter(id => !state.save.completed[id]).length}</div><div class="s">dossiers ouverts</div></div>
      <div class="stat-card"><div class="k">Indices collectés</div><div class="v">${totalClues}</div><div class="s">toutes affaires confondues</div></div>
    </div>
    <div class="stats-list">
      ${done.length ? cases.filter(c => state.save.completed[c.id]).map(c => { const d = state.save.completed[c.id]; return `<div class="stats-row"><div class="clue-ic">${icon('folder', 16)}</div><div class="nm"><strong>${esc(c.title)}</strong><div class="faint" style="font-size:.7rem">${new Date(d.completedAt).toLocaleDateString('fr-FR')}</div></div><div class="sc">${d.score.total} / 100</div><button class="btn small ghost" data-act="open-case" data-id="${c.id}">Revoir</button></div>`; }).join('') : '<div class="empty-state"><div class="ring">' + icon('stats', 26) + '</div><p>Vos affaires classées apparaîtront ici.</p></div>'}
    </div>
  </div></div>`;
}

function settingsScreen() {
  const s = state.save.settings;
  return `<div class="screen"><div class="topbar"><button class="back-btn" data-act="goto" data-screen="menu">${icon('back', 16)}<span>Menu</span></button><div class="title">Paramètres</div><div></div></div>
  <div class="settings-page">
    <div class="page-head"><div><h1>Confort d’enquête</h1><p>Adaptez le jeu à votre façon de jouer. Toutes les préférences sont enregistrées.</p></div></div>
    <div class="settings-card"><h3>${icon('document', 17)} Taille du texte</h3><p>Pour une lecture confortable sur iPad comme sur écran.</p>
      <div class="row"><button class="btn ${s.textSize === 'normal' ? 'primary' : ''}" data-act="textsize" data-v="normal">Normal</button><button class="btn ${s.textSize === 'large' ? 'primary' : ''}" data-act="textsize" data-v="large">Grand</button></div></div>
    <div class="settings-card"><h3>${icon('sound', 17)} Effets sonores</h3><p>Ambiance discrète lors des interactions : clics, découvertes, résolution.</p>
      <div class="row"><button class="btn ${s.sound ? 'primary' : ''}" data-act="sound" data-v="on">Activés</button><button class="btn ${!s.sound ? 'primary' : ''}" data-act="sound" data-v="off">Désactivés</button></div></div>
    <div class="settings-card"><h3>${icon('save', 17)} Sauvegardes</h3><p>La progression est enregistrée automatiquement dans ce navigateur. Chaque affaire possède sa propre sauvegarde.</p>
      <button class="btn danger" data-act="reset-save">${icon('trash', 15)} Réinitialiser toutes les sauvegardes</button></div>
    <div class="settings-card"><h3>${icon('play', 17)} Installation PWA</h3><p>Sur iPad : ouvrez le jeu dans Safari, appuyez sur Partager, puis « Sur l’écran d’accueil ». Le mode paysage est recommandé. Toutes les interactions sont tactiles.</p></div>
  </div></div>`;
}

function introScreen() {
  const c = activeCase()!; const p = progress()!;
  const objs = objectiveList(c, p);
  return `<div class="screen">
    <div class="topbar"><button class="back-btn" data-act="goto" data-screen="dossiers">${icon('back', 16)}<span>Dossiers</span></button><div class="title">Dossier ${caseNo(c)}</div><div class="meta red">Confidentiel</div></div>
    <div class="scroll" style="max-width:980px;margin:0 auto;width:100%">
      <div style="border-radius:18px;overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow);background:linear-gradient(170deg,#171d27,#0b0e13);">
        <div style="height:min(34vh,300px);position:relative;overflow:hidden">${caseCoverArt(c.id)}<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,10,14,.96),transparent 60%)"></div><div style="position:absolute;left:24px;bottom:18px;right:24px"><div class="meta gold" style="margin-bottom:8px">${icon('folder',12)} Dossier ${caseNo(c)} · ${esc(c.difficulty)}</div><h1 class="serif" style="margin:0;font-size:clamp(1.8rem,4vw,2.8rem);letter-spacing:.02em">${esc(c.title)}</h1></div></div>
        <div style="padding:clamp(18px,3vw,30px)">
          <p style="margin:0 0 16px;color:#cbd4e1;line-height:1.75;font-size:.95rem">${esc(c.intro)}</p>
          <div class="meta-row" style="margin-bottom:18px"><span class="meta">${icon('pin',12)} ${c.locations.length} lieux</span><span class="meta">${icon('users',12)} ${c.characters.length} témoins</span><span class="meta">${icon('search',12)} ${c.clues.length} indices</span><span class="meta">${icon('clock',12)} ${esc(c.duration)}</span><span class="meta">${icon('star',12)} ${esc(c.difficulty)}</span></div>
          ${objs.length ? `<div class="settings-card" style="margin:0 0 18px;background:rgba(10,13,18,.5)"><h3 style="font-size:.95rem">${icon('clipboard',16)} Objectifs de l’enquête</h3><div style="display:flex;flex-direction:column;gap:7px;margin-top:8px">${objs.map(o => `<div style="display:flex;gap:9px;align-items:flex-start;font-size:.82rem;color:var(--muted)"><span style="color:var(--gold);margin-top:1px">${icon('chevronRight',13)}</span><span><strong style="color:var(--text);font-weight:500">${esc(o.title)}</strong><br><span class="faint" style="font-size:.74rem">${esc(o.hint)}</span></span></div>`).join('')}</div></div>` : ''}
          <div class="row"><button class="btn primary" data-act="start-case">${icon('play',16)} Commencer l’enquête</button><span class="faint" style="font-size:.75rem">Sauvegarde automatique · vous pourrez reprendre à tout moment</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

function caseScreen() {
  const c = activeCase()!; const p = progress()!;
  const objs = objectiveList(c, p);
  const doneCount = objs.filter(o => o.done).length;
  const pct = objs.length ? Math.round((doneCount / objs.length) * 100) : Math.round((p.discoveredClues.length / c.clues.length) * 100);
  const tabs: [typeof state.caseTab, string, string][] = [['lieux', 'Lieux', 'pin'], ['indices', 'Indices', 'folder'], ['interrogatoires', 'Interrogatoires', 'users'], ['tableau', 'Tableau', 'board'], ['chronologie', 'Chronologie', 'clock'], ['resolution', 'Résolution', 'gavel']];
  return `<div class="screen case-shell">
    <div class="case-top">
      <button class="back-btn" data-act="goto" data-screen="dossiers">${icon('back', 16)}<span>Dossiers</span></button>
      <div style="min-width:0"><div class="case-id">DOSSIER ${caseNo(c)} · CONFIDENTIEL</div><div class="case-name">${esc(c.title)}</div></div>
      <div class="grow"></div>
      <div class="case-progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${doneCount}/${objs.length || 6}</span></div>
      <button class="icon-btn" data-act="objectives" title="Objectifs" aria-label="Objectifs">${icon('clipboard', 18)}</button>
      <button class="icon-btn" data-act="hint" title="Indice" aria-label="Indice">${icon('bulb', 18)}</button>
    </div>
    <div class="case-nav">${tabs.map(([id, label, ic]) => `<button class="${state.caseTab === id ? 'active' : ''}" data-act="tab" data-tab="${id}">${icon(ic, 15)}<span class="lbl">${label}</span></button>`).join('')}</div>
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
  const loc = c.locations.find(l => l.id === state.activeLocationId) || c.locations[0];
  return `<div class="explore">
    <aside class="loc-rail">
      <div class="rail-title"><span>Lieux de l’enquête</span><span>${p.visitedLocations.length}/${c.locations.length}</span></div>
      ${c.locations.map(l => {
        const isUnlocked = !l.locked || p.visitedLocations.includes(l.id) || isLocationUnlocked(c, l.id, p.discoveredClues);
        const meta = sceneMeta[l.illustration] || { label: l.name, icon: 'pin', tint: 'linear-gradient(135deg,#1b2230,#0b0e13)', sub: 'Zone' };
        return `<button class="loc-card ${state.activeLocationId === l.id ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}" data-act="loc" data-id="${l.id}" ${!isUnlocked ? 'disabled' : ''}>
          <div class="loc-thumb" style="background:${meta.tint}">${icon(isUnlocked ? meta.icon : 'lock', 24)}</div>
          <div class="lc"><strong>${esc(l.name)}</strong><span>${isUnlocked ? esc(meta.sub) : 'Accès verrouillé'}</span></div>
          <span class="state">${isUnlocked ? icon('chevronRight', 14) : icon('lock', 13)}</span>
        </button>`;
      }).join('')}
    </aside>
    <section class="scene-stage">
      <div class="scene-frame" id="scene">${renderScene(c, loc)}</div>
      <div class="scene-info-bar">
        <div class="si-copy"><h2>${esc(loc.name)}</h2><p>${esc(loc.description)}</p></div>
        <div class="si-meta"><span class="meta">${icon('search', 12)} ${(loc.hotspots || []).filter((h: any) => h.clueId ? p.discoveredClues.includes(h.clueId) : (h.unlocksLocationId ? p.visitedLocations.includes(h.unlocksLocationId) : false)).length}/${(loc.hotspots || []).length} éléments examinés</span></div>
      </div>
    </section>
  </div>`;
}

function isLocationUnlocked(c: CaseData, locId: string, discovered: string[]) {
  const loc = c.locations.find(l => l.id === locId); if (!loc || !loc.locked) return true;
  return c.locations.some(l => l.hotspots.some(h => h.unlocksLocationId === locId && h.clueId && discovered.includes(h.clueId)));
}

function renderScene(c: CaseData, loc: any) {
  const p = progress()!;
  const canSee = !loc.locked || isLocationUnlocked(c, loc.id, p.discoveredClues) || p.visitedLocations.includes(loc.id);
  if (!canSee) {
    return `<div class="scene-bg" style="background:radial-gradient(circle at 50% 40%,#1a2029,#080a0e)"></div>
      <div class="scene-locked"><div class="lockring">${icon('lock', 26)}</div><h3>Accès verrouillé</h3><p>${esc(loc.unlockHint || 'Cette zone doit être déverrouillée depuis un autre lieu.')}</p></div>`;
  }
  const bg = sceneSvg(loc.illustration, loc.name);
  const spots = (loc.hotspots || []).map((h: any) => {
    const found = h.clueId ? p.discoveredClues.includes(h.clueId) : (h.unlocksLocationId ? p.visitedLocations.includes(h.unlocksLocationId) : false);
    const isZoom = !!h.zoomText;
    return `<button class="hs ${found ? 'found' : ''} ${isZoom ? 'zoom' : ''}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%" data-act="hotspot" data-loc="${loc.id}" data-hid="${h.id}" aria-label="${esc(h.label)}">
      <span class="marker">${icon(found ? 'check' : isZoom ? 'search' : 'eye', 10)}</span><span class="hs-tip">${esc(h.label)}</span>
    </button>`;
  }).join('');
  return `<div class="scene-bg scene-${loc.illustration}">${bg}</div>
    <div class="scene-topline"><div class="scene-tag">${icon('pin', 12)} ${esc(loc.name)}</div><div class="scene-hint">${icon('eye', 12)} Touchez les marqueurs pour examiner</div></div>
    ${spots}`;
}

function sceneSvg(key: string, name: string) {
  const art = renderSceneArt(key);
  if (art) return art;
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

const CLUE_CATS = ['tous', 'objets', 'documents', 'temoignages', 'photographies', 'enregistrements', 'numerique'];
const CAT_LABEL: Record<string, string> = { tous: 'Tous', objets: 'Objets', documents: 'Documents', temoignages: 'Témoignages', photographies: 'Photos', enregistrements: 'Audio/Vidéo', numerique: 'Numérique' };

function renderInventory(c: CaseData) {
  const p = progress()!;
  const all = c.clues.filter(cl => p.discoveredClues.includes(cl.id));
  const clues = all.filter(cl => clueFilter === 'tous' || cl.category === clueFilter);
  const sel = clues.find(x => x.id === state.selectedClueId) || clues[0];
  if (sel) state.selectedClueId = sel.id;
  return `<div class="inv">
    <aside class="inv-side">
      <div class="inv-toolbar">
        <h2>Inventaire <span>${all.length}/${c.clues.length}</span></h2>
        <div class="filters">${CLUE_CATS.map(cat => `<button class="chip ${clueFilter === cat ? 'active' : ''}" data-act="filter" data-cat="${cat}">${CAT_LABEL[cat]}</button>`).join('')}</div>
      </div>
      <div class="clue-list">
        ${clues.length ? clues.map(cl => `<button class="clue-row ${sel?.id === cl.id ? 'active' : ''}" data-act="sel-clue" data-id="${cl.id}">
          <span class="clue-ic">${categoryIcon(cl.category)}</span>
          <span class="ct"><strong>${esc(cl.name)}</strong><span>${esc(cl.category)}</span></span>
          <span class="imp">${[1,2,3].map(i => `<i class="${i <= cl.importance ? 'on' : ''}"></i>`).join('')}</span>
        </button>`).join('') : `<div class="empty-state"><div class="ring">${icon('folder', 26)}</div><p>${all.length ? 'Aucun indice dans cette catégorie.' : 'Aucun indice découvert. Explorez les lieux et interrogez les témoins.'}</p></div>`}
      </div>
    </aside>
    <div class="inv-detail">${sel ? renderClueDetail(c, sel) : `<div class="empty-state"><div class="ring">${icon('search', 28)}</div><p>Sélectionnez un indice pour l’examiner.</p></div>`}</div>
  </div>`;
}

function renderClueDetail(c: CaseData, cl: Clue) {
  const loc = c.locations.find(l => l.id === cl.locationId);
  const doc = cl.documentText ? `<div class="doc"><span class="doc-label">Pièce jointe</span>${esc(cl.documentText)}</div>` : '';
  return `<article class="evidence">
    <div class="evidence-head"><div class="evidence-ic">${categoryIcon(cl.category)}</div><div><div class="cat">${esc(cl.category)} · indice ${cl.importance === 3 ? 'déterminant' : cl.importance === 2 ? 'important' : 'secondaire'}</div><h2>${esc(cl.name)}</h2></div></div>
    <div class="evidence-meta"><span>${icon('pin', 13)} <b>${esc(loc?.name || 'Lieu inconnu')}</b></span><span>${icon('star', 13)} Importance <b>${'★'.repeat(cl.importance)}</b></span><span>${icon('folder', 13)} ${esc(cl.category)}</span></div>
    <div class="evidence-body"><p>${esc(cl.description)}</p>${doc}</div>
  </article>`;
}

function renderDialogue(c: CaseData) {
  const p = progress()!;
  const ch = c.characters.find(x => x.id === state.activeCharacterId) || c.characters[0];
  if (ch) state.activeCharacterId = ch.id;
  const log = getDialogueLog(ch.id);
  return `<div class="talk">
    <aside class="cast">
      <div class="cast-title">Personnes à interroger · ${p.interviewed.length}/${c.characters.length}</div>
      ${c.characters.map(chh => `<button class="cast-card ${ch?.id === chh.id ? 'active' : ''}" data-act="char" data-id="${chh.id}">
        ${avatar(chh.name, 38)}
        <span class="cn"><strong>${esc(chh.name)}</strong><span>${esc(chh.role)}</span></span>
        ${p.interviewed.includes(chh.id) ? '<span class="done" title="Interrogé"></span>' : ''}
      </button>`).join('')}
    </aside>
    <div class="talk-main">${ch ? renderCharDialogue(c, ch, log) : ''}</div>
  </div>`;
}

const dialogueState: Record<string, { nodeId: string; log: { who: 'npc' | 'me'; text: string }[]; presented?: string[] }> = {};
function getDialogueLog(charId: string) {
  const c = activeCase()!; const ch = c.characters.find(x => x.id === charId)!;
  if (!dialogueState[charId]) dialogueState[charId] = { nodeId: ch.startNodeId, log: [{ who: 'npc', text: ch.nodes[ch.startNodeId].text }] };
  return dialogueState[charId];
}

function renderCharDialogue(c: CaseData, ch: Character, ds: { nodeId: string; log: { who: 'npc' | 'me'; text: string }[] }) {
  const node = ch.nodes[ds.nodeId] || ch.nodes[ch.startNodeId];
  const opts = node.options.filter(o => (!o.requiresClueIds || o.requiresClueIds.every(id => hasClue(id))) && (!o.requiresFlags || o.requiresFlags.every(f => hasFlag(f))));
  return `<div class="speaker">${avatar(ch.name, 52)}<div class="meta"><h2>${esc(ch.name)}</h2><div class="role">${esc(ch.role)}</div><div class="bio">${esc(ch.bio)}</div></div></div>
  <div class="chat" id="dlog">${ds.log.map(m => `<div class="bubble ${m.who}"><span class="who">${m.who === 'npc' ? esc(ch.name) : 'Vous'}</span>${esc(m.text)}</div>`).join('')}</div>
  <div class="ask">
    <div class="ask-title"><span>Questions disponibles</span><button class="btn small ghost" data-act="present" data-char="${ch.id}">${icon('fingerprint', 14)} Présenter une preuve</button></div>
    <div class="ask-grid">${opts.map((o, i) => `<button class="ask-opt ${o.requiresClueIds ? 'special' : ''}" data-act="ask" data-char="${ch.id}" data-opt="${o.id}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span>${esc(o.label)}</span></button>`).join('')}</div>
  </div>`;
}

function boardKindIcon(kind: string) {
  if (kind === 'clue') return 'fingerprint';
  if (kind === 'character') return 'user';
  if (kind === 'location') return 'pin';
  if (kind === 'event') return 'clock';
  return 'note';
}
function boardKindLabel(kind: string) {
  if (kind === 'clue') return 'Preuve';
  if (kind === 'character') return 'Personnage';
  if (kind === 'location') return 'Lieu';
  if (kind === 'event') return 'Événement';
  return 'Note';
}
function boardEdgesSvg(b: any) {
  return `<svg class="board-svg" width="4000" height="3000">${b.edges.map((e: any) => {
    const a = b.nodes.find((n: any) => n.id === e.from), d = b.nodes.find((n: any) => n.id === e.to);
    if (!a || !d) return '';
    const x1 = a.x + 95, y1 = a.y + 30, x2 = d.x + 95, y2 = d.y + 30;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.min(90, Math.abs(x2 - x1) * .18 + 30);
    return `<path d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}" fill="none" stroke="#b5483f" stroke-width="2.5" opacity=".75" filter="drop-shadow(0 2px 2px rgba(0,0,0,.5))"/><circle cx="${x1}" cy="${y1}" r="3" fill="#d9786f"/><circle cx="${x2}" cy="${y2}" r="3" fill="#d9786f"/>`;
  }).join('')}</svg>`;
}
function renderBoard(c: CaseData) {
  const p = progress()!;
  const b = p.board;
  const nodesHtml = b.nodes.map(n => `<div class="board-node ${n.kind === 'note' ? 'note' : ''}" data-node="${n.id}" style="left:${n.x}px;top:${n.y}px">
    <div class="bn-kind">${icon(boardKindIcon(n.kind), 11)} ${boardKindLabel(n.kind)}</div>
    <h4>${esc(n.label)}</h4>
    ${n.kind === 'note' ? `<textarea class="note-input" data-note="${n.id}" placeholder="Votre note…">${esc((n as any).text || '')}</textarea>` : ''}
    <div class="bn-actions"><button data-act="edge-from" data-id="${n.id}">${icon('link', 11)} Relier</button><button data-act="del-node" data-id="${n.id}" aria-label="Supprimer">${icon('trash', 11)}</button></div>
  </div>`).join('');
  return `<div class="board-wrap" id="boardWrap">
    <div class="board-toolbar">
      <button class="btn" data-act="add-board" data-kind="clue">${icon('fingerprint', 14)} Preuve</button>
      <button class="btn" data-act="add-board" data-kind="character">${icon('user', 14)} Personnage</button>
      <button class="btn" data-act="add-board" data-kind="location">${icon('pin', 14)} Lieu</button>
      <button class="btn" data-act="add-board" data-kind="note">${icon('note', 14)} Note</button>
      <button class="btn ghost" data-act="board-reset">${icon('search', 14)} Centrer</button>
      <button class="btn ghost" data-act="clear-edges">${icon('trash', 14)} Liens</button>
    </div>
    <div class="board-zoom"><button class="icon-btn" data-act="zoom" data-dir="in" aria-label="Zoom avant">${icon('zoomIn', 18)}</button><button class="icon-btn" data-act="zoom" data-dir="out" aria-label="Zoom arrière">${icon('zoomOut', 18)}</button></div>
    ${b.nodes.length === 0 ? `<div class="board-empty"><div class="ring">${icon('board', 30)}</div><p>Votre tableau est vide.</p><small>Ajoutez une preuve, un personnage ou un lieu, puis reliez-les pour faire émerger la vérité.</small></div>` : ''}
    <div class="board-canvas" id="boardCanvas" style="transform: translate(${b.pan.x}px,${b.pan.y}px) scale(${b.zoom}); width:4000px; height:3000px">${boardEdgesSvg(b)}${nodesHtml}</div>
    <div class="board-legend"><span>${icon('link', 11)} Glissez un élément pour le déplacer</span><span>·</span><span>Pincez pour zoomer</span></div>
  </div>`;
}

function renderTimeline(c: CaseData) {
  const p = progress()!;
  if (p.timelineOrder.length === 0) {
    p.timelineOrder = [...c.timeline].reverse().map(t => t.id);
    markDirty();
  }
  const order = p.timelineOrder;
  const items = order.map(id => c.timeline.find(t => t.id === id)).filter(Boolean) as any[];
  return `<div class="timeline-page">
    <div class="tl-head"><div><h1>Chronologie</h1><p>Replacez les événements dans l’ordre, du premier au dernier. Les heures et les témoignages doivent concorder. Utilisez les flèches pour ajuster.</p></div><div class="row"><button class="btn" data-act="verify-timeline">${icon('check', 15)} Vérifier l’ordre</button></div></div>
    <div class="timeline">
      ${items.map((t, i) => `<div class="tl-item">
        <div class="tl-time">${esc(t.time)}</div>
        <div class="tl-content"><strong>${esc(t.label)}</strong><span>${esc(t.details)}</span></div>
        <div class="tl-controls"><button data-act="tl-move" data-id="${t.id}" data-dir="up" aria-label="Monter">${icon('arrowUp', 12)}</button><button data-act="tl-move" data-id="${t.id}" data-dir="down" aria-label="Descendre">${icon('arrowDown', 12)}</button></div>
      </div>`).join('')}
    </div>
    <div class="tl-feedback"><div class="note-card"><h3>${icon('search', 15)} Incohérences relevées</h3><ul>${timelineHints(c, p).map(h => `<li>${esc(h)}</li>`).join('') || '<li class="muted">Continuez l’enquête pour identifier des incohérences.</li>'}</ul></div></div>
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
    return `<div class="resolve-page"><div class="resolve"><div class="verdict">
      <div class="stamp">Affaire classée</div>
      <h2>${esc(c.title)}</h2>
      <p class="muted" style="margin:0">Votre déduction est confirmée. Le dossier peut être refermé.</p>
      <div class="score">${p.score.total}<small> / 100</small></div>
      <ul>${p.score.breakdown.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <h3 class="serif" style="margin:18px 0 6px;font-size:1.2rem">Ce qui s’est réellement passé</h3>
      <p style="color:#cbd4e1;line-height:1.75;margin:0 0 18px">${esc(c.solution.whatHappened)}</p>
      <button class="btn primary" data-act="goto" data-screen="completed">${icon('folder', 16)} Voir les affaires terminées</button>
    </div></div></div>`;
  }
  const missing = p.discoveredClues.length < c.clues.length;
  return `<div class="resolve-page"><div class="resolve">
    <div class="resolve-head"><h1>Résolution de l’enquête</h1><p>Vous pensez avoir compris l’affaire ? Répondez aux cinq questions. En cas d’erreur, la solution ne sera pas révélée : vous pourrez reprendre l’enquête.</p></div>
    <div class="note-card" style="margin-bottom:14px"><h3>${icon('clipboard', 15)} État du dossier</h3><div class="meta-row"><span class="meta">${icon('search', 12)} ${p.discoveredClues.length}/${c.clues.length} indices</span><span class="meta">${icon('users', 12)} ${p.interviewed.length}/${c.characters.length} interrogatoires</span><span class="meta ${p.attempts ? 'red' : ''}">${icon('gavel', 12)} ${p.attempts} tentative${p.attempts > 1 ? 's' : ''}</span>${missing ? `<span class="meta red">${icon('bulb', 12)} Des indices manquent peut-être</span>` : `<span class="meta green">${icon('check', 12)} Tous les indices collectés</span>`}</div></div>
    <form id="resolveForm">${c.solution.questions.map((q, i) => `<div class="q"><div class="q-title"><span class="q-no">QUESTION ${String(i + 1).padStart(2, '0')}</span><strong>${esc(q.prompt)}</strong></div>
      ${q.options.map(o => `<label><input type="radio" name="${q.id}" value="${o.id}"><span>${esc(o.text)}</span></label>`).join('')}</div>`).join('')}
      <div class="resolve-actions"><button type="button" class="btn primary" data-act="submit-resolution">${icon('gavel', 16)} Valider la déduction</button><span class="faint" style="font-size:.75rem">Tentatives : ${p.attempts}</span></div>
    </form>
    <div id="resolveResult" class="resolve-result"></div>
  </div></div>`;
}

let boardDrag: {id:string, ox:number, oy:number, startX:number, startY:number, moved:boolean} | null = null;
let boardPan: {sx:number, sy:number, ox:number, oy:number, moved:boolean} | null = null;
let edgeFrom: string | null = null;

function bindEvents() {
  root.onclick = (e) => {
    const t = (e.target as HTMLElement).closest('[data-act]') as HTMLElement | null;
    if (!t) return;
    const act = t.dataset.act;
    if (act === 'goto') { sfx('click', state.save.settings.sound); setScreen(t.dataset.screen as any); }
    else if (act === 'continue') continueLast();
    else if (act === 'open-case') { sfx('click', state.save.settings.sound); openCase(t.dataset.id!); }
    else if (act === 'replay-case') {
      const id = t.dataset.id!;
      if (confirm('Rejouer cette affaire ? La progression et le score précédents seront remplacés.')) {
        delete state.save.cases[id];
        delete state.save.completed[id];
        state.save.stats.casesCompleted = Object.keys(state.save.completed).length;
        persistSave(state.save);
        sfx('click', state.save.settings.sound);
        openCase(id);
      }
    }
    else if (act === 'start-case') { const p = progress()!; if (!p.visitedLocations.length) visitLocation(activeCase()!.locations[0].id); state.screen = 'case'; checkObjectives(); emit(); }
    else if (act === 'tab') { sfx('click', state.save.settings.sound); state.caseTab = t.dataset.tab as any; emit(); }
    else if (act === 'loc') { sfx('click', state.save.settings.sound); visitLocation(t.dataset.id!); checkObjectives(); }
    else if (act === 'hotspot') handleHotspot(t.dataset.loc!, t.dataset.hid!);
    else if (act === 'close-modal') { modal = null; emit(); }
    else if (act === 'sel-clue') { sfx('click', state.save.settings.sound); state.selectedClueId = t.dataset.id; emit(); }
    else if (act === 'filter') { clueFilter = t.dataset.cat!; state.selectedClueId = undefined; emit(); }
    else if (act === 'char') { sfx('click', state.save.settings.sound); state.activeCharacterId = t.dataset.id; emit(); setTimeout(() => { const d = document.getElementById('dlog'); if (d) d.scrollTop = d.scrollHeight; }, 0); }
    else if (act === 'ask') handleAsk(t.dataset.char!, t.dataset.opt!);
    else if (act === 'present') showEvidencePicker(t.dataset.char!);
    else if (act === 'present-clue') presentClue(t.dataset.char!, t.dataset.id!);
    else if (act === 'objectives') showObjectives();
    else if (act === 'hint') useHint();
    else if (act === 'add-board') openBoardPicker(t.dataset.kind as any);
    else if (act === 'pick-board') pickBoard(t.dataset.kind as any, t.dataset.id!);
    else if (act === 'save-note') saveBoardNote();
    else if (act === 'board-reset') { const p = progress()!; p.board.pan = { x: 0, y: 0 }; p.board.zoom = 1; markDirty(); emit(); }
    else if (act === 'edge-from') { edgeFrom = t.dataset.id!; state.notice = 'Sélectionnez un second élément pour créer le lien.'; emit(); setTimeout(() => { state.notice = undefined; emit(); }, 2200); }
    else if (act === 'del-node') deleteBoardNode(t.dataset.id!);
    else if (act === 'clear-edges') { const p = progress()!; p.board.edges = []; markDirty(); emit(); }
    else if (act === 'zoom') { const p = progress()!; p.board.zoom = Math.min(2.2, Math.max(0.35, p.board.zoom + (t.dataset.dir === 'in' ? 0.12 : -0.12))); markDirty(); emit(); }
    else if (act === 'verify-timeline') verifyTimeline();
    else if (act === 'submit-resolution') { const f = document.getElementById('resolveForm') as HTMLFormElement | null; if (f) submitResolution(f); }
    else if (act === 'tl-move') moveTimeline(t.dataset.id!, t.dataset.dir as any);
    else if (act === 'textsize') { state.save.settings.textSize = t.dataset.v as any; document.documentElement.style.fontSize = state.save.settings.textSize === 'large' ? '18px' : '16px'; markDirty(); emit(); }
    else if (act === 'sound') { state.save.settings.sound = t.dataset.v === 'on'; markDirty(); emit(); }
    else if (act === 'reset-save') { if (confirm('Réinitialiser toutes les sauvegardes ?')) { state.save = resetSlot(); dialogueStateClear(); setScreen('menu'); } }
  };

  const form = document.getElementById('resolveForm') as HTMLFormElement | null;
  if (form) form.onsubmit = (e) => { e.preventDefault(); submitResolution(form); };

  const boardWrap = document.getElementById('boardWrap');
  const boardCanvas = document.getElementById('boardCanvas');
  if (boardWrap && boardCanvas) bindBoard(boardWrap as HTMLElement, boardCanvas as HTMLElement);

  root.querySelectorAll('textarea[data-note]').forEach(el => {
    (el as HTMLTextAreaElement).onchange = () => {
      const id = (el as HTMLTextAreaElement).dataset.note!;
      const p = progress()!; const n = p.board.nodes.find(x => x.id === id) as any;
      if (n) { n.text = (el as HTMLTextAreaElement).value; markDirty(); }
    };
  });

  document.documentElement.style.fontSize = state.save.settings.textSize === 'large' ? '18px' : '16px';
}

function continueLast() {
  const entries = Object.values(state.save.cases).sort((a, b) => b.updatedAt - a.updatedAt);
  if (entries.length) openCase(entries[0].caseId);
  else setScreen('dossiers');
}

function showObjectives() {
  const c = activeCase()!; const p = progress()!;
  const objs = objectiveList(c, p);
  const body = `<div style="display:flex;flex-direction:column;gap:9px">
    ${objs.map(o => `<div class="picker-item" style="align-items:flex-start;padding:12px;border-color:${o.done ? 'rgba(93,167,127,.35)' : 'var(--line)'}">
      <span class="pi" style="color:${o.done ? 'var(--green)' : 'var(--gold)'}">${icon(o.done ? 'check' : 'chevronRight', 16)}</span>
      <span style="flex:1"><strong style="color:var(--text);font-weight:500">${esc(o.title)}</strong><br><span class="faint" style="font-size:.76rem;line-height:1.5">${esc(o.hint)}</span></span>
      ${o.done ? '<span class="meta green">Atteint</span>' : ''}
    </div>`).join('')}
  </div>
  <p class="faint" style="font-size:.75rem;margin:12px 0 0">Progression : ${objs.filter(o => o.done).length}/${objs.length} objectifs. Chaque objectif atteint est enregistré automatiquement.</p>`;
  showModal('Objectifs de l’enquête', body, `Dossier ${caseNo(c)} · ${esc(c.title)}`);
}

function useHint() {
  const c = activeCase()!; const p = progress()!;
  const next = (c.objectives || []).find(o => !o.check(p));
  if (!next) {
    showModal('Indice', '<p>Tous les objectifs sont atteints. Si vous hésitez encore, relisez les preuves clés dans l’inventaire et vérifiez la chronologie, puis lancez la résolution.</p>', 'Enquête avancée');
    return;
  }
  p.hintsUsed = (p.hintsUsed || 0) + 1; p.updatedAt = Date.now(); markDirty(); sfx('click', state.save.settings.sound);
  showModal(`Indice · ${next.title}`, `<p>${esc(next.hint)}</p><p class="faint" style="font-size:.75rem;margin-top:12px">Les aides utilisées sont prises en compte dans le score final.</p>`, 'Aide à l’enquête');
}

function showEvidencePicker(charId: string) {
  const c = activeCase()!; const p = progress()!;
  const clues = c.clues.filter(cl => p.discoveredClues.includes(cl.id));
  const body = clues.length ? `<p class="faint" style="margin-top:0">Choisissez un indice à présenter. Certaines preuves provoqueront des réactions inattendues.</p><div class="picker-grid">${clues.map(cl => `<button class="picker-item" data-act="present-clue" data-char="${charId}" data-id="${cl.id}"><span class="pi">${categoryIcon(cl.category)}</span><span><strong style="color:var(--text);font-weight:500">${esc(cl.name)}</strong><br><span class="faint" style="font-size:.68rem">${esc(cl.category)}</span></span></button>`).join('')}</div>` : '<div class="picker-empty">Vous n’avez encore aucun indice à présenter.</div>';
  showModal('Présenter une preuve', body, 'Confronter un témoin');
}

function presentClue(charId: string, clueId: string) {
  const c = activeCase()!; const ch = c.characters.find(x => x.id === charId)!; const clue = c.clues.find(x => x.id === clueId)!;
  const ds = getDialogueLog(charId);
  ds.presented = ds.presented || [];
  ds.log.push({ who: 'me', text: `Je vous montre : ${clue.name}.` });
  if (ds.presented.includes(clueId)) {
    ds.log.push({ who: 'npc', text: 'Je vous ai déjà répondu à ce sujet. Je n’ai rien de plus à ajouter.' });
  } else {
    ds.presented.push(clueId);
    let found: { nodeId: string; opt: any } | null = null;
    for (const [nodeId, node] of Object.entries(ch.nodes)) {
      const opt = node.options.find(o => o.requiresClueIds && o.requiresClueIds.includes(clueId));
      if (opt) { found = { nodeId, opt }; break; }
    }
    if (found) {
      ds.log.push({ who: 'npc', text: found.opt.response });
      if (found.opt.grantsClueIds) found.opt.grantsClueIds.forEach((id: string) => discoverClue(id));
      if (found.opt.setsFlags) found.opt.setsFlags.forEach((f: string) => addFlag(f));
      ds.nodeId = found.opt.nextNodeId || found.nodeId;
      sfx('discover', state.save.settings.sound);
    } else {
      const generic = [
        'Je ne vois pas ce que vous voulez insinuer avec ça.',
        'Ça ne me dit rien. Vous perdez votre temps.',
        'Je ne peux pas vous aider avec cet élément.',
        'Pourquoi me montrez-vous ça ? Je n’y suis pour rien.'
      ];
      ds.log.push({ who: 'npc', text: generic[Math.floor(Math.random() * generic.length)] });
      sfx('click', state.save.settings.sound);
    }
  }
  markInterviewed(charId); markDirty(); modal = null; checkObjectives(); emit();
  setTimeout(() => { const d = document.getElementById('dlog'); if (d) d.scrollTop = d.scrollHeight; }, 0);
}

function openBoardPicker(kind: 'clue' | 'character' | 'location' | 'note') {
  const c = activeCase()!; const p = progress()!;
  boardPickKind = kind;
  if (kind === 'note') {
    showModal('Nouvelle note', `<p class="faint" style="margin-top:0">Ajoutez une hypothèse, un lien ou une question au tableau.</p><textarea id="boardNoteText" class="note-input" style="min-height:110px;background:rgba(0,0,0,.25);color:var(--text);border-color:var(--line)" placeholder="Ex. Morel ment sur son heure de départ…"></textarea>
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn primary" data-act="save-note">${icon('plus', 15)} Ajouter au tableau</button></div>`, 'Tableau d’enquête');
    return;
  }
  let items: { id: string; label: string; sub: string }[] = [];
  if (kind === 'clue') items = c.clues.filter(cl => p.discoveredClues.includes(cl.id)).map(cl => ({ id: cl.id, label: cl.name, sub: cl.category }));
  if (kind === 'character') items = c.characters.map(ch => ({ id: ch.id, label: ch.name, sub: ch.role }));
  if (kind === 'location') items = c.locations.filter(l => p.visitedLocations.includes(l.id)).map(l => ({ id: l.id, label: l.name, sub: 'Lieu visité' }));
  const body = items.length ? `<div class="picker-grid">${items.map(it => `<button class="picker-item" data-act="pick-board" data-kind="${kind}" data-id="${it.id}"><span class="pi">${kind === 'clue' ? categoryIcon(it.sub) : icon(kind === 'character' ? 'user' : 'pin', 15)}</span><span><strong style="color:var(--text);font-weight:500">${esc(it.label)}</strong><br><span class="faint" style="font-size:.68rem">${esc(it.sub)}</span></span></button>`).join('')}</div>` : '<div class="picker-empty">Aucun élément disponible pour le moment.</div>';
  showModal(kind === 'clue' ? 'Ajouter une preuve' : kind === 'character' ? 'Ajouter un personnage' : 'Ajouter un lieu', body, 'Tableau d’enquête');
}

function pickBoard(kind: 'clue' | 'character' | 'location', id: string) {
  const c = activeCase()!; const p = progress()!;
  let label = 'Élément', refId = id;
  if (kind === 'clue') label = c.clues.find(x => x.id === id)?.name || label;
  if (kind === 'character') label = c.characters.find(x => x.id === id)?.name || label;
  if (kind === 'location') label = c.locations.find(x => x.id === id)?.name || label;
  const node: BoardNode = { id: 'bn_' + Math.random().toString(36).slice(2, 8), refId, kind: kind as any, label, x: 120 + (p.board.nodes.length % 5) * 210, y: 110 + Math.floor(p.board.nodes.length / 5) * 150 };
  p.board.nodes.push(node); markDirty(); modal = null; emit();
}

function saveBoardNote() {
  const p = progress()!;
  const el = document.getElementById('boardNoteText') as HTMLTextAreaElement | null;
  const text = el?.value.trim(); if (!text) return;
  p.board.nodes.push({ id: 'bn_' + Math.random().toString(36).slice(2, 8), refId: 'note', kind: 'note', label: text.slice(0, 32), x: 120 + (p.board.nodes.length % 5) * 210, y: 110 + Math.floor(p.board.nodes.length / 5) * 150, ...({ text } as any) });
  markDirty(); modal = null; emit();
}

function verifyTimeline() {
  const c = activeCase()!; const p = progress()!;
  const order = p.timelineOrder.length ? p.timelineOrder : c.timeline.map(t => t.id);
  const correct = c.solution.correctTimelineOrder;
  const exact = order.filter((id, i) => id === correct[i]).length;
  if (exact === correct.length) {
    state.notice = 'Chronologie exacte. Le déroulement est reconstitué.';
    sfx('success', state.save.settings.sound);
    addFlag('timeline_verified');
    checkObjectives();
  } else {
    state.notice = `${exact}/${correct.length} événements à la bonne place.`;
    sfx('error', state.save.settings.sound);
  }
  emit();
  setTimeout(() => { state.notice = undefined; emit(); }, 3000);
}

function dialogueStateClear(){ for(const k of Object.keys(dialogueState)) delete dialogueState[k]; }

function handleHotspot(locId: string, hid: string) {
  const c = activeCase()!; const p = progress()!;
  const loc = c.locations.find(l=>l.id===locId)!; const h = loc.hotspots.find(x=>x.id===hid)!;
  let body = `<p>${esc(h.description)}</p>`;
  if (h.clueId && !p.discoveredClues.includes(h.clueId)) {
    if (discoverClue(h.clueId)) {
      const cl = c.clues.find(x=>x.id===h.clueId);
      if (cl) body += `<div class="card" style="margin-top:12px;border-color:rgba(201,164,106,.35);background:rgba(201,164,106,.04)"><div class="meta gold" style="display:inline-flex;margin-bottom:8px">${icon('check', 12)} Nouvel indice</div><h3 style="margin:0 0 6px;display:flex;align-items:center;gap:8px"><span style="color:var(--gold);display:inline-flex">${categoryIcon(cl.category)}</span>${esc(cl.name)}</h3><p class="muted" style="margin:0">${esc(cl.description)}</p>${cl.documentText ? `<div class="doc" style="margin-top:12px">${esc(cl.documentText)}</div>` : ''}</div>`;
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

const boardPointers = new Map<number, { x: number; y: number }>();
let boardPinch: { dist: number; zoom: number; midX: number; midY: number; panX: number; panY: number } | null = null;

function bindBoard(wrap: HTMLElement, canvas: HTMLElement) {
  wrap.querySelectorAll('.board-node').forEach(el => {
    const nodeEl = el as HTMLElement;
    nodeEl.onpointerdown = (ev) => {
      if ((ev.target as HTMLElement).closest('button,textarea')) return;
      const id = nodeEl.dataset.node!;
      if (edgeFrom && edgeFrom !== id) {
        const p = progress()!; const eid = 'be_' + Math.random().toString(36).slice(2, 8);
        if (!p.board.edges.find(e => (e.from === edgeFrom && e.to === id) || (e.from === id && e.to === edgeFrom))) p.board.edges.push({ id: eid, from: edgeFrom, to: id });
        edgeFrom = null; markDirty(); emit(); return;
      }
      boardDrag = { id, ox: nodeEl.offsetLeft, oy: nodeEl.offsetTop, startX: ev.clientX, startY: ev.clientY, moved: false };
      nodeEl.setPointerCapture(ev.pointerId);
    };
    nodeEl.onpointermove = (ev) => {
      if (!boardDrag || boardDrag.id !== nodeEl.dataset.node) return;
      const dx = (ev.clientX - boardDrag.startX) / (progress()!.board.zoom);
      const dy = (ev.clientY - boardDrag.startY) / (progress()!.board.zoom);
      if (Math.abs(dx) + Math.abs(dy) > 3) boardDrag.moved = true;
      const p = progress()!; const n = p.board.nodes.find(x => x.id === boardDrag!.id);
      if (n) { n.x = Math.max(0, boardDrag.ox + dx); n.y = Math.max(0, boardDrag.oy + dy); nodeEl.style.left = n.x + 'px'; nodeEl.style.top = n.y + 'px'; refreshBoardEdges(p); }
    };
    nodeEl.onpointerup = () => { if (boardDrag && boardDrag.id === nodeEl.dataset.node) { markDirty(); boardDrag = null; } };
  });

  wrap.onpointerdown = (ev) => {
    if ((ev.target as HTMLElement).closest('.board-node, .board-toolbar, .board-zoom')) return;
    const p = progress()!;
    wrap.setPointerCapture(ev.pointerId);
    boardPointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (boardPointers.size === 2) {
      const pts = [...boardPointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      boardPinch = { dist, zoom: p.board.zoom, midX, midY, panX: p.board.pan.x, panY: p.board.pan.y };
      boardPan = null;
    } else if (boardPointers.size === 1) {
      boardPan = { sx: ev.clientX, sy: ev.clientY, ox: p.board.pan.x, oy: p.board.pan.y, moved: false };
    }
  };
  wrap.onpointermove = (ev) => {
    if (boardPointers.has(ev.pointerId)) boardPointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (boardPinch && boardPointers.size >= 2) {
      const pts = [...boardPointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const p = progress()!;
      const ratio = dist / Math.max(1, boardPinch.dist);
      const newZoom = Math.min(2.2, Math.max(0.35, boardPinch.zoom * ratio));
      const cx = (boardPinch.midX - boardPinch.panX) / boardPinch.zoom;
      const cy = (boardPinch.midY - boardPinch.panY) / boardPinch.zoom;
      p.board.zoom = newZoom;
      p.board.pan.x = boardPinch.midX - cx * newZoom;
      p.board.pan.y = boardPinch.midY - cy * newZoom;
      canvas.style.transform = `translate(${p.board.pan.x}px,${p.board.pan.y}px) scale(${p.board.zoom})`;
      return;
    }
    if (!boardPan) return;
    const p = progress()!;
    p.board.pan.x = boardPan.ox + (ev.clientX - boardPan.sx);
    p.board.pan.y = boardPan.oy + (ev.clientY - boardPan.sy);
    canvas.style.transform = `translate(${p.board.pan.x}px,${p.board.pan.y}px) scale(${p.board.zoom})`;
  };
  const end = (ev: PointerEvent) => {
    boardPointers.delete(ev.pointerId);
    if (boardPointers.size < 2) boardPinch = null;
    if (boardPointers.size === 0 && boardPan) { markDirty(); boardPan = null; }
  };
  wrap.onpointerup = end;
  wrap.onpointercancel = end;
  wrap.onwheel = (ev) => {
    ev.preventDefault();
    const p = progress()!;
    const rect = wrap.getBoundingClientRect();
    const mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    const newZoom = Math.min(2.2, Math.max(0.35, p.board.zoom * (ev.deltaY > 0 ? 0.92 : 1.08)));
    const cx = (mx - p.board.pan.x) / p.board.zoom;
    const cy = (my - p.board.pan.y) / p.board.zoom;
    p.board.zoom = newZoom;
    p.board.pan.x = mx - cx * newZoom;
    p.board.pan.y = my - cy * newZoom;
    canvas.style.transform = `translate(${p.board.pan.x}px,${p.board.pan.y}px) scale(${p.board.zoom})`;
    markDirty();
  };
}
function refreshBoardEdges(p: any) {
  const svg = document.querySelector('.board-svg');
  if (!svg) return;
  svg.outerHTML = boardEdgesSvg(p.board);
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
    res.innerHTML = `<div class="fail-card"><h3>Déduction incomplète — ${correct}/${c.solution.questions.length}</h3>
      <ul>${details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      <p style="color:#d6c0bd;font-size:.82rem;line-height:1.6;margin:0 0 12px">Certains éléments ne concordent pas. Reprenez l’enquête : explorez les lieux restants, relisez les indices et vérifiez la chronologie. La solution n’est pas révélée.</p>
      <button class="btn primary" data-act="tab" data-tab="lieux">${icon('back', 15)} Retourner sur le terrain</button></div>`;
    const attemptsLabel = document.querySelector('.resolve-actions .faint');
    if (attemptsLabel) attemptsLabel.textContent = `Tentatives : ${p.attempts}`;
    markDirty(); persistSave(state.save);
    setTimeout(() => document.getElementById('resolveResult')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 40);
    return;
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
  const elapsedMin = Math.max(1, Math.round((Date.now() - p.startedAt) / 60000));
  const timeBonus = elapsedMin <= 30 ? 10 : elapsedMin <= 60 ? 7 : elapsedMin <= 120 ? 4 : 0;
  let total = clues + deductions + contradictions + timeBonus - hintsPenalty;
  total = Math.max(0, Math.min(100, total));
  const breakdown = [
    `Indices découverts : ${p.discoveredClues.length}/${c.clues.length} (+${clues})`,
    `Preuves clés identifiées : ${keyFound}/${c.solution.keyClueIds.length} (+${deductions})`,
    `Contradictions / pistes vérifiées : ${contraFlags}/4 (+${contradictions})`,
    `Tentatives de résolution : ${p.attempts} (pénalité ${Math.max(0,(p.attempts-1))*3})`,
    `Temps d’enquête : ${elapsedMin} min (+${timeBonus})`
  ];
  return { total, clues, deductions, contradictions, hints: hintsPenalty, time: timeBonus, breakdown };
}
