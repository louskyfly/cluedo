const PATHS: Record<string, string> = {
  door: '<path d="M4 21V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v17"/><path d="M2 21h20"/><circle cx="13.5" cy="12" r="1"/>',
  desk: '<path d="M3 10h18"/><path d="M4 10v10"/><path d="M20 10v10"/><path d="M4 14h16"/><path d="M8 10V6h8v4"/>',
  server: '<rect x="4" y="3" width="16" height="7" rx="2"/><rect x="4" y="14" width="16" height="7" rx="2"/><circle cx="8" cy="6.5" r="1"/><circle cx="8" cy="17.5" r="1"/><path d="M12 6.5h5"/><path d="M12 17.5h5"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/><path d="M7 15h10"/>',
  archive: '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8"/><path d="M9 12h6"/>',
  bed: '<path d="M3 18v-6h18v6"/><path d="M3 12V7h18v5"/><path d="M6 7v5"/><path d="M3 18v2"/><path d="M21 18v2"/><path d="M7 12h4v3"/>',
  shirt: '<path d="M8 4l4 2 4-2 5 3-2 4-3-1v10H8V10L5 11 3 7z"/>',
  car: '<path d="M5 17h14"/><path d="M6 17l1-5h10l1 5"/><path d="M7 12l2-5h6l2 5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4.2-4.2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 21a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14.5a6.5 6.5 0 0 1 3.5 5.7"/>',
  board: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 17v3"/><path d="M16 17v3"/><path d="M7 9h4"/><path d="M7 12h6"/><circle cx="16" cy="9.5" r="1.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gavel: '<path d="M14 3l7 7-3 3-7-7z"/><path d="M11 6l-7 7 3 3 7-7"/><path d="M4 21h8"/>',
  save: '<path d="M5 3h11l4 4v14H5z"/><path d="M8 3v6h8V3"/><path d="M8 21v-7h8v7"/>',
  sound: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 8a5 5 0 0 1 0 8"/><path d="M19 5a9 9 0 0 1 0 14"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.5-.2-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.3h-4V22a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.2.1-2-3.5.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H2.7v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3.5.2.1A1.7 1.7 0 0 0 8.3 4a1.7 1.7 0 0 0 1-1.6V2h4v.3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.2-.1 2 3.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.3v4h-.3a1.7 1.7 0 0 0-1.6 1z"/>',
  stats: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  back: '<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l2 2"/><path d="M14 9l2 2"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="4"/>',
  document: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>',
  usb: '<rect x="7" y="3" width="10" height="12" rx="2"/><path d="M10 7h4"/><path d="M10 11h4"/><path d="M12 15v6"/><rect x="10" y="18" width="4" height="3" rx="1"/>',
  glass: '<path d="M5 4h14l-2 16H7z"/><path d="M5 4c3 2 11 2 14 0"/><path d="M9 14h6"/>',
  coat: '<path d="M8 3l4 3 4-3 4 4-3 3v11H7V10L4 7z"/><path d="M12 6v15"/>',
  box: '<path d="M3 8l9-5 9 5-9 5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M8 21h8"/>',
  fingerprint: '<path d="M12 11a4 4 0 0 0-4 4c0 3 1 4 1 4"/><path d="M12 7a8 8 0 0 0-8 8c0 2 .5 3 .5 3"/><path d="M12 3a12 12 0 0 0-9 4"/><path d="M12 15a2 2 0 0 0-2 2c0 2 .5 3 .5 3"/><path d="M16 15a4 4 0 0 1 4 4"/><path d="M12 11a4 4 0 0 1 4 4c0 3-1 4-1 4"/>',
  note: '<path d="M4 4h11l5 5v11H4z"/><path d="M15 4v5h5"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  link: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
  trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 14h10l1-14"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  x: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  zoomIn: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/><path d="M8 11h6"/><path d="M11 8v6"/>',
  zoomOut: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/><path d="M8 11h6"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  star: '<path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2-5.6-3-5.6 3 1.2-6.2L3 9.5l6.3-.8z"/>',
  arrowUp: '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>',
  arrowDown: '<path d="M12 5v14"/><path d="M6 13l6 6 6-6"/>',
  menu: '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
  close: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  book: '<path d="M4 5a3 3 0 0 1 3-2h13v18H7a3 3 0 0 1-3-3z"/><path d="M4 18.5A3 3 0 0 1 7 16h13"/>',
  photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 15l-5-5L5 20"/>',
  tape: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/>',
  log: '<path d="M4 5h16"/><path d="M4 10h16"/><path d="M4 15h10"/><path d="M4 20h7"/>'
};

export function icon(name: string, size = 20, cls = ''): string {
  const body = PATHS[name] || PATHS.search;
  return `<svg class="oc-icon ${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export function categoryIcon(cat: string): string {
  switch (cat) {
    case 'objets': return icon('box', 16);
    case 'documents': return icon('document', 16);
    case 'temoignages': return icon('users', 16);
    case 'photographies': return icon('photo', 16);
    case 'enregistrements': return icon('tape', 16);
    case 'numerique': return icon('server', 16);
    default: return icon('search', 16);
  }
}

const TONES = [
  ['#8a6cff', '#3d2a7a'], ['#4fb9a8', '#194a44'], ['#d4865a', '#5a2f1d'],
  ['#6aa7d8', '#223f5c'], ['#c9a46a', '#4a3a20'], ['#b76e79', '#4a2a31'],
  ['#7b9e63', '#2c3d22'], ['#9a7bb8', '#3d2c4d']
];

export function avatar(name: string, size = 48): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const [a, b] = TONES[h % TONES.length];
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return `<svg class="oc-avatar" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    <defs><linearGradient id="av${h % 9999}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="64" height="64" rx="32" fill="url(#av${h % 9999})"/>
    <circle cx="32" cy="25" r="12" fill="#0b0d12" opacity=".55"/>
    <path d="M10 62c2-15 11-22 22-22s20 7 22 22z" fill="#0b0d12" opacity=".55"/>
    <text x="32" y="40" text-anchor="middle" fill="#fff" font-size="18" font-family="Georgia,serif" font-weight="600">${initials}</text>
  </svg>`;
}
