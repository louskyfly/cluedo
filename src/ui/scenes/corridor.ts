export function corridorArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="coWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a2a2e"/><stop offset=".55" stop-color="#1a1b20"/><stop offset="1" stop-color="#0e0f13"/>
    </linearGradient>
    <linearGradient id="coFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3330"/><stop offset=".5" stop-color="#241f1e"/><stop offset="1" stop-color="#100d0c"/>
    </linearGradient>
    <linearGradient id="coCarpet" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a2326"/><stop offset=".5" stop-color="#34191c"/><stop offset="1" stop-color="#1a0d0f"/>
    </linearGradient>
    <linearGradient id="coDoor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a2b1e"/><stop offset="1" stop-color="#221910"/>
    </linearGradient>
    <radialGradient id="coLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffcf86" stop-opacity=".5"/><stop offset=".4" stop-color="#ffcf86" stop-opacity=".15"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="coVign" cx=".5" cy=".46" r=".72">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
    </radialGradient>
    <filter id="coBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="coBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="coGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer></filter>
  </defs>

  <!-- perspective corridor -->
  <rect width="1600" height="900" fill="#0a0b0e"/>
  <polygon points="0,0 1600,0 1160,210 440,210" fill="#14151a"/>
  <polygon points="0,900 1600,900 1160,620 440,620" fill="url(#coFloor)"/>
  <polygon points="0,0 440,210 440,620 0,900" fill="#1a1a1e"/>
  <polygon points="1600,0 1160,210 1160,620 1600,900" fill="#16161a"/>
  <polygon points="440,210 1160,210 1160,620 440,620" fill="#202126"/>

  <!-- back wall -->
  <rect x="440" y="210" width="720" height="410" fill="url(#coWall)" stroke="#34343a" stroke-width="3"/>

  <!-- carpet runner -->
  <polygon points="520,660 1080,660 1220,900 380,900" fill="url(#coCarpet)"/>
  <polygon points="550,678 1050,678 1160,880 440,880" fill="none" stroke="#8a4a4a" stroke-opacity=".3" stroke-width="2"/>
  <g stroke="#a86a5a" stroke-opacity=".12" stroke-width="2">
    <line x1="500" y1="700" x2="1100" y2="700"/><line x1="460" y1="780" x2="1140" y2="780"/>
  </g>

  <!-- ceiling -->
  <polygon points="0,0 1600,0 1160,210 440,210" fill="#101114"/>
  <g stroke="#2a2b30" stroke-width="2" opacity=".7"><line x1="440" y1="120" x2="1160" y2="120"/><line x1="440" y1="60" x2="1160" y2="60"/></g>
  <g>
    <rect x="620" y="70" width="140" height="8" rx="4" fill="#c9a46a" opacity=".4"/>
    <rect x="840" y="70" width="140" height="8" rx="4" fill="#c9a46a" opacity=".4"/>
    <ellipse cx="690" cy="150" rx="100" ry="60" fill="url(#coLamp)" opacity=".3"/>
    <ellipse cx="910" cy="150" rx="100" ry="60" fill="url(#coLamp)" opacity=".3"/>
  </g>

  <!-- left doors -->
  <g>
    <rect x="150" y="260" width="150" height="320" fill="url(#coDoor)" stroke="#3a2b1e" stroke-width="3"/>
    <rect x="166" y="278" width="118" height="284" fill="#1a120c"/>
    <circle cx="268" cy="420" r="6" fill="#c9a46a" opacity=".7"/>
    <rect x="184" y="292" width="82" height="22" rx="3" fill="#c9a46a" opacity=".25"/>
    <text x="225" y="307" text-anchor="middle" fill="#e3c893" fill-opacity=".7" font-size="11" font-family="Segoe UI" letter-spacing="2">403</text>
  </g>
  <g transform="translate(40,180) scale(.82)">
    <rect x="150" y="260" width="150" height="320" fill="url(#coDoor)" stroke="#3a2b1e" stroke-width="3"/>
    <rect x="166" y="278" width="118" height="284" fill="#1a120c"/>
    <circle cx="268" cy="420" r="6" fill="#c9a46a" opacity=".7"/>
    <text x="225" y="307" text-anchor="middle" fill="#e3c893" fill-opacity=".7" font-size="13" font-family="Segoe UI" letter-spacing="2">401</text>
  </g>
  <!-- right doors -->
  <g>
    <rect x="1180" y="240" width="170" height="350" fill="url(#coDoor)" stroke="#3a2b1e" stroke-width="3"/>
    <rect x="1198" y="260" width="134" height="310" fill="#1a120c"/>
    <circle cx="1310" cy="410" r="6" fill="#c9a46a" opacity=".7"/>
    <rect x="1214" y="276" width="102" height="22" rx="3" fill="#c9a46a" opacity=".25"/>
    <text x="1265" y="291" text-anchor="middle" fill="#e3c893" fill-opacity=".7" font-size="11" font-family="Segoe UI" letter-spacing="2">407</text>
  </g>
  <g transform="translate(180,160) scale(.82)">
    <rect x="1180" y="240" width="170" height="350" fill="url(#coDoor)" stroke="#3a2b1e" stroke-width="3"/>
    <rect x="1198" y="260" width="134" height="310" fill="#1a120c"/>
    <circle cx="1310" cy="410" r="6" fill="#c9a46a" opacity=".7"/>
    <text x="1265" y="291" text-anchor="middle" fill="#e3c893" fill-opacity=".7" font-size="13" font-family="Segoe UI" letter-spacing="2">405</text>
  </g>

  <!-- sconces -->
  <g>
    <rect x="420" y="300" width="10" height="40" fill="#8a6a48"/>
    <path d="M406 300 h38 l-6 18 h-26 z" fill="#b9924f" opacity=".8"/>
    <ellipse cx="425" cy="320" rx="50" ry="40" fill="url(#coLamp)" opacity=".6"/>
    <rect x="1170" y="290" width="10" height="40" fill="#8a6a48"/>
    <path d="M1156 290 h38 l-6 18 h-26 z" fill="#b9924f" opacity=".8"/>
    <ellipse cx="1175" cy="310" rx="50" ry="40" fill="url(#coLamp)" opacity=".6"/>
  </g>

  <!-- service door at end right -->
  <g>
    <rect x="980" y="270" width="180" height="350" fill="#2a2b30" stroke="#4a4b52" stroke-width="4"/>
    <rect x="998" y="288" width="144" height="314" fill="#1b1c21"/>
    <rect x="1018" y="308" width="104" height="90" fill="#0a1118" stroke="#3a4a5a"/>
    <text x="1070" y="358" text-anchor="middle" fill="#7aa2c8" font-size="10" font-family="Segoe UI" letter-spacing="2">SORTIE</text>
    <text x="1070" y="374" text-anchor="middle" fill="#7aa2c8" font-size="10" font-family="Segoe UI" letter-spacing="2">SERVICE</text>
    <rect x="1120" y="450" width="20" height="60" rx="6" fill="#5a4330"/>
    <rect x="1004" y="440" width="40" height="64" rx="4" fill="#2a2b30" stroke="#4a4b52"/>
    <circle cx="1024" cy="460" r="5" fill="#39d98a"/>
    <rect x="1014" y="474" width="20" height="16" fill="#0b1118"/>
    <text x="1070" y="650" text-anchor="middle" fill="#8a8b92" font-size="13" font-family="Segoe UI" letter-spacing="2">ESCALIER DE SERVICE</text>
  </g>

  <!-- laundry cart -->
  <g transform="translate(390,540)">
    <rect x="0" y="0" width="300" height="160" rx="10" fill="#3a4450" stroke="#5a6a78" stroke-width="4"/>
    <rect x="16" y="16" width="268" height="128" fill="#2a3440"/>
    <g stroke="#5a6a78" stroke-width="2"><line x1="16" y1="60" x2="284" y2="60"/><line x1="16" y1="104" x2="284" y2="104"/><line x1="100" y1="16" x2="100" y2="144"/><line x1="200" y1="16" x2="200" y2="144"/></g>
    <rect x="24" y="28" width="70" height="28" rx="4" fill="#e8e0d0" opacity=".8"/>
    <rect x="120" y="70" width="70" height="28" rx="4" fill="#d8d0c0" opacity=".8"/>
    <rect x="220" y="36" width="50" height="24" rx="4" fill="#e8e0d0" opacity=".7"/>
    <circle cx="40" cy="176" r="14" fill="#14181e"/><circle cx="260" cy="176" r="14" fill="#14181e"/>
    <rect x="0" y="150" width="300" height="10" fill="#1f242c"/>
  </g>

  <!-- fiber on carpet -->
  <path d="M800 680 q30 -12 60 2" fill="none" stroke="#6a8a9a" stroke-width="3" stroke-linecap="round" opacity=".65"/>
  <circle cx="830" cy="676" r="2" fill="#9fc7e8" opacity=".8"/>

  <!-- housekeeping cart -->
  <g transform="translate(1230,560)">
    <rect x="0" y="0" width="130" height="120" rx="8" fill="#3a4450" stroke="#5a6a78" stroke-width="3"/>
    <rect x="12" y="12" width="106" height="96" fill="#2a3440"/>
    <rect x="20" y="20" width="40" height="30" rx="3" fill="#e8e0d0" opacity=".7"/>
    <rect x="70" y="20" width="40" height="20" rx="3" fill="#9fc7e8" opacity=".4"/>
    <circle cx="20" cy="130" r="10" fill="#14181e"/><circle cx="110" cy="130" r="10" fill="#14181e"/>
  </g>

  <!-- ambient -->
  <ellipse cx="800" cy="430" rx="360" ry="220" fill="#ffcf86" opacity=".03" filter="url(#coBlur)"/>
  <rect width="1600" height="900" filter="url(#coGrain)" opacity=".5"/>
  <rect width="1600" height="900" fill="url(#coVign)"/>
  </svg>`;
}
