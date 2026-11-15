export function menuArt() {
  return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mRoom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d121a"/><stop offset=".55" stop-color="#121822"/><stop offset="1" stop-color="#070a0e"/>
    </linearGradient>
    <linearGradient id="mNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#071524"/><stop offset=".5" stop-color="#0d2a40"/><stop offset="1" stop-color="#040b12"/>
    </linearGradient>
    <linearGradient id="mLight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd18a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd18a" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="mLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffce84" stop-opacity=".7"/><stop offset=".4" stop-color="#ffce84" stop-opacity=".18"/><stop offset="1" stop-color="#ffce84" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mCity" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#7aa2c8" stop-opacity=".35"/><stop offset="1" stop-color="#7aa2c8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mVign" cx=".5" cy=".46" r=".75">
      <stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/>
    </radialGradient>
    <filter id="mBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="mBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="mGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".11"/></feComponentTransfer></filter>
  </defs>

  <rect width="1600" height="1000" fill="url(#mRoom)"/>
  <!-- floor -->
  <rect x="0" y="720" width="1600" height="280" fill="#0a0d12"/>
  <g stroke="#3a3f4a" stroke-opacity=".1" stroke-width="2">
    <line x1="0" y1="1000" x2="760" y2="720"/><line x1="300" y1="1000" x2="780" y2="720"/>
    <line x1="600" y1="1000" x2="800" y2="720"/><line x1="900" y1="1000" x2="820" y2="720"/>
    <line x1="1200" y1="1000" x2="840" y2="720"/><line x1="1500" y1="1000" x2="860" y2="720"/>
    <line x1="100" y1="780" x2="1500" y2="780"/><line x1="0" y1="860" x2="1600" y2="860"/>
  </g>

  <!-- window wall right -->
  <rect x="820" y="90" width="620" height="630" fill="#0a0f16" stroke="#232a35" stroke-width="10"/>
  <rect x="846" y="116" width="568" height="578" fill="url(#mNight)"/>
  <g stroke="#8db8d8" stroke-opacity=".18" stroke-width="2">
    ${Array.from({ length: 26 }, (_, i) => `<line x1="${860 + (i * 73) % 540}" y1="${130 + (i * 37) % 160}" x2="${840 + (i * 73) % 540}" y2="${250 + (i * 71) % 360}"/>`).join('')}
  </g>
  <!-- city lights -->
  <g opacity=".55">
    ${Array.from({ length: 40 }, (_, i) => `<rect x="${870 + (i * 91) % 520}" y="${300 + (i * 53) % 300}" width="3" height="3" fill="#ffcf86" opacity="${.3 + (i % 4) * .15}"/>`).join('')}
  </g>
  <ellipse cx="1180" cy="520" rx="260" ry="220" fill="url(#mCity)" opacity=".6"/>
  <!-- window mullions -->
  <line x1="1130" y1="116" x2="1130" y2="694" stroke="#1a212b" stroke-width="12"/>
  <line x1="846" y1="420" x2="1414" y2="420" stroke="#1a212b" stroke-width="10"/>
  <!-- blinds shadows -->
  <g fill="#070a0e" opacity=".5">
    ${Array.from({ length: 9 }, (_, i) => `<rect x="846" y="${130 + i * 62}" width="568" height="12"/>`).join('')}
  </g>
  <polygon points="846,116 1414,116 1200,720 600,720" fill="#7aa2c8" opacity=".035"/>

  <!-- desk foreground -->
  <polygon points="60,720 980,720 1080,830 0,830" fill="#2a2118" stroke="#1a140f" stroke-width="3"/>
  <rect x="0" y="830" width="1080" height="30" fill="#1b150e"/>
  <rect x="90" y="860" width="40" height="140" fill="#17110c"/><rect x="920" y="860" width="40" height="140" fill="#17110c"/>
  <g stroke="#3d2f22" stroke-width="3" opacity=".4">
    <line x1="180" y1="740" x2="870" y2="740"/><line x1="140" y1="780" x2="930" y2="780"/>
  </g>

  <!-- case files and papers -->
  <g transform="translate(150,700)">
    <rect x="0" y="18" width="210" height="60" fill="#6b5842" stroke="#3d3126" transform="rotate(-3 105 48)"/>
    <rect x="10" y="0" width="210" height="60" fill="#7a654c" stroke="#3d3126" transform="rotate(2 115 30)"/>
    <rect x="24" y="-16" width="210" height="58" fill="#e5dcc8" stroke="#c4b89c" transform="rotate(-1 129 13)"/>
    <text x="70" y="6" fill="#5a4a38" font-size="13" font-family="Georgia,serif" transform="rotate(-1 129 13)">DOSSIER 001</text>
    <line x1="40" y1="24" x2="200" y2="22" stroke="#b8ab90" transform="rotate(-1 129 13)"/>
    <line x1="40" y1="36" x2="160" y2="34" stroke="#b8ab90" transform="rotate(-1 129 13)"/>
  </g>

  <!-- magnifying glass -->
  <g transform="translate(420,770) rotate(-18)">
    <circle cx="0" cy="0" r="46" fill="#7aa2c8" opacity=".08" stroke="#8a6a48" stroke-width="8"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="#c9a46a" stroke-width="2" opacity=".5"/>
    <rect x="32" y="30" width="90" height="14" rx="7" fill="#4a3826" transform="rotate(38 32 30)"/>
  </g>

  <!-- lamp -->
  <g>
    <ellipse cx="930" cy="740" rx="26" ry="10" fill="#1a140f"/>
    <rect x="924" y="560" width="12" height="180" fill="#3a3026"/>
    <path d="M850 520 h150 l-28 64 h-94 z" fill="#3a3f49" stroke="#242a33"/>
    <ellipse cx="925" cy="520" rx="72" ry="12" fill="#5a5f68" opacity=".5"/>
    <ellipse cx="900" cy="740" rx="380" ry="220" fill="url(#mLamp)" opacity=".75"/>
  </g>

  <!-- detective silhouette by window -->
  <g opacity=".92">
    <ellipse cx="1050" cy="760" rx="120" ry="24" fill="#000" opacity=".5" filter="url(#mBlurS)"/>
    <path d="M1010 380 q40 -24 80 0 l24 180 q-52 26 -128 0 z" fill="#0a0d12"/>
    <path d="M1018 420 q-34 60 -46 180 l44 10 q18 -100 44 -150 z" fill="#0a0d12"/>
    <path d="M1082 420 q34 60 46 180 l-44 10 q-18 -100 -44 -150 z" fill="#0a0d12"/>
    <circle cx="1050" cy="348" r="30" fill="#0a0d12"/>
    <path d="M1004 344 q46 -34 92 0 l6 12 h-104 z" fill="#0a0d12"/>
    <path d="M1020 330 q30 -22 60 0" fill="none" stroke="#161c25" stroke-width="10"/>
    <rect x="1030" y="540" width="40" height="170" fill="#080b0f"/>
    <rect x="1030" y="700" width="40" height="40" fill="#080b0f"/>
    <rect x="1070" y="700" width="40" height="40" fill="#080b0f"/>
  </g>
  <!-- cigarette smoke / haze -->
  <g fill="#9fb6c9" opacity=".05" filter="url(#mBlur)">
    <ellipse cx="1080" cy="430" rx="80" ry="140"/>
    <ellipse cx="1140" cy="340" rx="50" ry="100"/>
  </g>

  <!-- dust -->
  <g fill="#ffe0a8" opacity=".45">
    <circle cx="600" cy="300" r="2"/><circle cx="720" cy="260" r="1.5"/><circle cx="880" cy="380" r="2"/>
    <circle cx="420" cy="420" r="1.5"/><circle cx="980" cy="240" r="2"/><circle cx="1280" cy="300" r="1.5"/>
    <circle cx="300" cy="220" r="1.5"/><circle cx="540" cy="560" r="2"/>
  </g>

  <rect width="1600" height="1000" filter="url(#mGrain)" opacity=".6"/>
  <rect width="1600" height="1000" fill="url(#mVign)"/>
  </svg>`;
}
