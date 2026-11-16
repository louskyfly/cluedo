export function laundryArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="laWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#263a3d"/><stop offset=".55" stop-color="#18282c"/><stop offset="1" stop-color="#0d171a"/>
    </linearGradient>
    <linearGradient id="laFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34484b"/><stop offset=".5" stop-color="#223236"/><stop offset="1" stop-color="#0e171a"/>
    </linearGradient>
    <linearGradient id="laSteel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9fb4b8"/><stop offset=".45" stop-color="#71868b"/><stop offset="1" stop-color="#3e5156"/>
    </linearGradient>
    <linearGradient id="laMachine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a5f63"/><stop offset="1" stop-color="#2a3a3e"/>
    </linearGradient>
    <radialGradient id="laLight" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#d9f4fb" stop-opacity=".35"/><stop offset="1" stop-color="#d9f4fb" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="laVign" cx=".5" cy=".46" r=".72">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
    </radialGradient>
    <filter id="laBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="laBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="laGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer></filter>
  </defs>

  <polygon points="0,0 1600,0 1420,120 180,120" fill="#0a1113"/>
  <rect x="180" y="120" width="1240" height="480" fill="url(#laWall)"/>
  <polygon points="0,0 180,120 180,600 0,900" fill="#0b1315"/>
  <polygon points="1600,0 1420,120 1420,600 1600,900" fill="#0a1113"/>
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#laFloor)"/>
  <rect x="180" y="586" width="1240" height="16" fill="#0b1315" stroke="#3e565a" stroke-width="2"/>

  <!-- wall tiles -->
  <g stroke="#3e565a" stroke-width="2" opacity=".5">
    <line x1="180" y1="260" x2="1420" y2="260"/><line x1="180" y1="400" x2="1420" y2="400"/>
    <line x1="180" y1="520" x2="1420" y2="520"/>
    <line x1="420" y1="120" x2="420" y2="600"/><line x1="820" y1="120" x2="820" y2="600"/>
    <line x1="1220" y1="120" x2="1220" y2="600"/>
  </g>
  <rect x="196" y="136" width="1208" height="440" fill="none" stroke="#4e6a6e" stroke-opacity=".45" stroke-width="2"/>

  <!-- floor drains + tiles -->
  <g stroke="#7fb0b8" stroke-opacity=".1" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="500"/><line x1="400" y1="900" x2="800" y2="500"/>
    <line x1="800" y1="900" x2="800" y2="500"/><line x1="1200" y1="900" x2="800" y2="500"/>
    <line x1="1600" y1="900" x2="800" y2="500"/>
    <line x1="120" y1="650" x2="1480" y2="650"/><line x1="50" y1="730" x2="1550" y2="730"/>
    <line x1="0" y1="820" x2="1600" y2="820"/>
  </g>
  <g fill="#0b1315" stroke="#3e565a"><rect x="760" y="760" width="80" height="50" rx="4"/><rect x="300" y="690" width="60" height="40" rx="4"/></g>

  <!-- washing machines left -->
  <g>
    <rect x="180" y="330" width="230" height="260" rx="10" fill="url(#laMachine)" stroke="#5a7278" stroke-width="4"/>
    <circle cx="295" cy="450" r="76" fill="#0b1418" stroke="#6d8a90" stroke-width="5"/>
    <circle cx="295" cy="450" r="54" fill="#173238" opacity=".8"/>
    <path d="M250 420 q20 -24 44 -10 q26 16 50 -2" fill="none" stroke="#9fc7e8" stroke-opacity=".25" stroke-width="6"/>
    <g fill="#39d98a"><circle cx="220" cy="360" r="4"/><circle cx="238" cy="360" r="4"/></g>
    <rect x="220" y="530" width="150" height="10" rx="4" fill="#1a2a2e"/>
    <rect x="210" y="570" width="170" height="20" fill="#1a2a2e"/>
  </g>
  <g>
    <rect x="700" y="330" width="230" height="260" rx="10" fill="url(#laMachine)" stroke="#5a7278" stroke-width="4"/>
    <circle cx="815" cy="450" r="76" fill="#0b1418" stroke="#6d8a90" stroke-width="5"/>
    <circle cx="815" cy="450" r="54" fill="#173238" opacity=".8"/>
    <path d="M770 420 q20 -24 44 -10 q26 16 50 -2" fill="none" stroke="#9fc7e8" stroke-opacity=".25" stroke-width="6"/>
    <g fill="#39d98a"><circle cx="740" cy="360" r="4"/><circle cx="758" cy="360" r="4"/></g>
    <rect x="740" y="530" width="150" height="10" rx="4" fill="#1a2a2e"/>
    <rect x="730" y="570" width="170" height="20" fill="#1a2a2e"/>
  </g>

  <!-- shelves with linens -->
  <g>
    <rect x="1000" y="240" width="340" height="320" fill="#2a3a3e" stroke="#4e6a6e" stroke-width="3"/>
    <rect x="1014" y="254" width="312" height="292" fill="#1d2c30"/>
    ${Array.from({ length: 3 }, (_, r) => `<rect x="1026" y="${266 + r * 92}" width="288" height="76" fill="#162428" stroke="#34515a"/>`).join('')}
    ${Array.from({ length: 5 }, (_, i) => `<rect x="${1038 + i * 54}" y="276" width="40" height="50" rx="4" fill="#d8d2c2" opacity=".8"/><rect x="${1038 + i * 54}" y="368" width="40" height="50" rx="4" fill="#c8c2b2" opacity=".7"/><rect x="${1038 + i * 54}" y="460" width="40" height="50" rx="4" fill="#d8d2c2" opacity=".7"/>`).join('')}
  </g>

  <!-- uniform rack -->
  <g>
    <rect x="620" y="230" width="10" height="310" fill="#5a7278"/><rect x="880" y="230" width="10" height="310" fill="#5a7278"/>
    <rect x="610" y="230" width="290" height="12" rx="5" fill="#5a7278"/>
    ${[650, 710, 770, 830].map((x, i) => `<g transform="translate(${x},250)"><path d="M0 0 h44 l-8 10 h-28 z" fill="#8fa8ae"/><path d="M6 14 h32 l6 150 q-22 14 -44 0 z" fill="${i === 2 ? '#1b2b2f' : '#e8f0f2'}" opacity="${i === 2 ? '.25' : '.85'}" stroke="#9fb4b8"/></g>`).join('')}
    <text x="755" y="220" text-anchor="middle" fill="#7d9aa0" font-size="11" font-family="Segoe UI" letter-spacing="2">UNIFORMES</text>
  </g>

  <!-- table with log -->
  <g>
    <rect x="980" y="470" width="320" height="20" fill="url(#laSteel)" stroke="#3e5156"/>
    <rect x="1010" y="490" width="18" height="120" fill="#3e5156"/><rect x="1250" y="490" width="18" height="120" fill="#3e5156"/>
    <rect x="1030" y="446" width="190" height="26" fill="#e9e3d4" stroke="#b9ae98" transform="rotate(-2 1125 459)"/>
    <g stroke="#a99e88" stroke-width="1" transform="rotate(-2 1125 459)"><line x1="1044" y1="456" x2="1200" y2="454"/><line x1="1044" y1="464" x2="1170" y2="462"/></g>
    <rect x="1240" y="438" width="50" height="32" rx="4" fill="#2a3a3e" stroke="#4e6a6e"/>
    <g fill="#67d8e8" opacity=".5"><rect x="1248" y="446" width="34" height="3"/><rect x="1248" y="454" width="24" height="3"/></g>
  </g>

  <!-- basket with tag on floor -->
  <g transform="translate(380,580)">
    <path d="M0 0 h150 l-14 120 h-122 z" fill="#3a4a4e" stroke="#5a7278" stroke-width="3"/>
    <ellipse cx="75" cy="0" rx="75" ry="16" fill="#4a5f63" stroke="#6d8a90"/>
    <rect x="30" y="20" width="90" height="40" rx="4" fill="#d8d2c2" opacity=".5"/>
    <g transform="translate(14,120) rotate(-10)">
      <rect x="0" y="0" width="62" height="34" rx="3" fill="#e9e3d4" stroke="#b9ae98"/>
      <text x="31" y="14" text-anchor="middle" fill="#4a3d2c" font-size="7" font-family="Segoe UI">J. MARIN</text>
      <text x="31" y="25" text-anchor="middle" fill="#8a7a65" font-size="6" font-family="Segoe UI">LINGE</text>
    </g>
  </g>

  <!-- steam -->
  <g fill="#cfeeF4" opacity=".06" filter="url(#laBlur)">
    <ellipse cx="330" cy="280" rx="130" ry="90"/><ellipse cx="820" cy="260" rx="150" ry="100"/>
    <ellipse cx="540" cy="200" rx="120" ry="80"/>
  </g>

  <!-- ceiling lights -->
  <g>
    <rect x="360" y="60" width="300" height="12" rx="5" fill="#d9f4fb" opacity=".7"/>
    <rect x="940" y="60" width="300" height="12" rx="5" fill="#d9f4fb" opacity=".7"/>
    <ellipse cx="510" cy="140" rx="200" ry="80" fill="url(#laLight)" opacity=".25"/>
    <ellipse cx="1090" cy="140" rx="200" ry="80" fill="url(#laLight)" opacity=".25"/>
  </g>

  <!-- ambient -->
  <ellipse cx="800" cy="600" rx="560" ry="180" fill="#67d8e8" opacity=".025" filter="url(#laBlur)"/>
  <ellipse cx="800" cy="850" rx="620" ry="80" fill="#000" opacity=".4" filter="url(#laBlur)"/>
  <rect width="1600" height="900" filter="url(#laGrain)" opacity=".5"/>
  <rect width="1600" height="900" fill="url(#laVign)"/>
  </svg>`;
}
