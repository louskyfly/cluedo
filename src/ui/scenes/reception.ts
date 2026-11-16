export function receptionArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rcWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b2118"/><stop offset=".55" stop-color="#1e1711"/><stop offset="1" stop-color="#120e0a"/>
    </linearGradient>
    <linearGradient id="rcFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3d3329"/><stop offset=".45" stop-color="#2a221b"/><stop offset="1" stop-color="#15110d"/>
    </linearGradient>
    <linearGradient id="rcMarble" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d9cdb6"/><stop offset=".5" stop-color="#bcae94"/><stop offset="1" stop-color="#8f816b"/>
    </linearGradient>
    <linearGradient id="rcWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5a4330"/><stop offset="1" stop-color="#33251a"/>
    </linearGradient>
    <linearGradient id="rcNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#081626"/><stop offset=".55" stop-color="#0d2a40"/><stop offset="1" stop-color="#050d14"/>
    </linearGradient>
    <radialGradient id="rcLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffcf86" stop-opacity=".55"/><stop offset=".4" stop-color="#ffcf86" stop-opacity=".18"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rcVign" cx=".5" cy=".46" r=".72">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
    </radialGradient>
    <filter id="rcBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="rcBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="rcGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer></filter>
  </defs>

  <polygon points="0,0 1600,0 1420,120 180,120" fill="#0c0906"/>
  <rect x="180" y="120" width="1240" height="480" fill="url(#rcWall)"/>
  <polygon points="0,0 180,120 180,600 0,900" fill="#100c08"/>
  <polygon points="1600,0 1420,120 1420,600 1600,900" fill="#0c0906"/>
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#rcFloor)"/>
  <rect x="180" y="586" width="1240" height="16" fill="#0d0a07" stroke="#4a3929" stroke-width="2"/>

  <!-- wall paneling -->
  <g stroke="#4a3929" stroke-width="2" opacity=".55">
    <line x1="180" y1="300" x2="1420" y2="300"/><line x1="180" y1="440" x2="1420" y2="440"/>
    <line x1="420" y1="120" x2="420" y2="600"/><line x1="840" y1="120" x2="840" y2="600"/>
    <line x1="1220" y1="120" x2="1220" y2="600"/>
  </g>
  <rect x="196" y="136" width="1208" height="440" fill="none" stroke="#5c4935" stroke-opacity=".55" stroke-width="2"/>

  <!-- floor marble -->
  <g stroke="#9b8a72" stroke-opacity=".12" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="500"/><line x1="400" y1="900" x2="800" y2="500"/>
    <line x1="800" y1="900" x2="800" y2="500"/><line x1="1200" y1="900" x2="800" y2="500"/>
    <line x1="1600" y1="900" x2="800" y2="500"/>
    <line x1="120" y1="650" x2="1480" y2="650"/><line x1="50" y1="730" x2="1550" y2="730"/>
    <line x1="0" y1="820" x2="1600" y2="820"/>
  </g>
  <polygon points="420,680 1180,680 1300,900 300,900" fill="#2a1d16" opacity=".7"/>
  <polygon points="450,692 1150,692 1250,880 350,880" fill="none" stroke="#8a6a48" stroke-opacity=".35" stroke-width="2"/>

  <!-- glass entrance left -->
  <g>
    <polygon points="20,200 170,250 170,590 20,760" fill="#08111a" stroke="#4a3929" stroke-width="4"/>
    <polygon points="34,212 158,256 158,576 34,738" fill="url(#rcNight)" opacity=".9"/>
    <g stroke="#9fc7e8" stroke-opacity=".2" stroke-width="1.5">
      <line x1="50" y1="240" x2="40" y2="300"/><line x1="80" y1="252" x2="64" y2="360"/>
      <line x1="112" y1="266" x2="94" y2="380"/><line x1="140" y1="280" x2="124" y2="390"/>
      <line x1="60" y1="430" x2="48" y2="510"/><line x1="110" y1="450" x2="92" y2="560"/>
    </g>
    <line x1="96" y1="236" x2="96" y2="640" stroke="#4a3929" stroke-width="4"/>
    <line x1="34" y1="470" x2="158" y2="412" stroke="#4a3929" stroke-width="4"/>
    <rect x="50" y="690" width="110" height="14" rx="4" fill="#2a2018"/>
    <g fill="#ffcf86" opacity=".4">
      <rect x="50" y="330" width="3" height="3"/><rect x="118" y="360" width="3" height="3"/>
      <rect x="70" y="520" width="3" height="3"/><rect x="132" y="500" width="3" height="3"/>
    </g>
  </g>

  <!-- painting -->
  <g transform="translate(470,200)">
    <rect x="0" y="0" width="210" height="150" fill="#2a2018" stroke="#8a6a48" stroke-width="5"/>
    <rect x="12" y="12" width="186" height="126" fill="#1a2433"/>
    <path d="M12 106 q50 -46 92 -12 q38 30 94 8 v36 H12 z" fill="#2e4252" opacity=".8"/>
    <circle cx="152" cy="46" r="17" fill="#d9b77e" opacity=".6"/>
    <path d="M40 110 q40 -30 80 -6 q30 18 78 0" fill="none" stroke="#6b8a9d" stroke-width="2" opacity=".6"/>
  </g>
  <!-- sconces -->
  <g>
    <rect x="740" y="300" width="12" height="50" fill="#8a6a48"/>
    <path d="M724 300 h44 l-8 22 h-28 z" fill="#b9924f" opacity=".8"/>
    <ellipse cx="746" cy="320" rx="42" ry="30" fill="url(#rcLamp)" opacity=".7"/>
    <rect x="1180" y="300" width="12" height="50" fill="#8a6a48"/>
    <path d="M1164 300 h44 l-8 22 h-28 z" fill="#b9924f" opacity=".8"/>
    <ellipse cx="1186" cy="320" rx="42" ry="30" fill="url(#rcLamp)" opacity=".7"/>
  </g>

  <!-- key rack -->
  <g transform="translate(920,240)">
    <rect x="0" y="0" width="270" height="210" fill="#3a2b1e" stroke="#8a6a48" stroke-width="4"/>
    <rect x="12" y="12" width="246" height="186" fill="#241a12"/>
    ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, c) => `<g><rect x="${28 + c * 38}" y="${28 + r * 34}" width="28" height="24" rx="3" fill="#4a3929" stroke="#2a2018"/><circle cx="${42 + c * 38}" cy="${40 + r * 34}" r="2.5" fill="#c9a46a" opacity=".7"/></g>`).join('')).join('')}
    <text x="135" y="200" text-anchor="middle" fill="#c9a46a" fill-opacity=".6" font-size="11" font-family="Segoe UI" letter-spacing="4">CLÉS</text>
    <text x="135" y="-14" text-anchor="middle" fill="#8a6a48" font-size="11" font-family="Segoe UI" letter-spacing="4">RÉCEPTION</text>
  </g>

  <!-- CCTV monitor -->
  <g transform="translate(1200,390)">
    <rect x="0" y="0" width="150" height="130" rx="5" fill="#121822" stroke="#4a3929" stroke-width="3"/>
    <rect x="12" y="12" width="126" height="86" rx="2" fill="#06121a"/>
    <g stroke="#1d3444" stroke-width="1"><rect x="18" y="18" width="54" height="34" fill="#0a1820"/><rect x="78" y="18" width="54" height="34" fill="#0a1820"/><rect x="18" y="58" width="54" height="34" fill="#0a1820"/><rect x="78" y="58" width="54" height="34" fill="#0a1820"/></g>
    <g fill="#5fe3b0" opacity=".6" font-size="6" font-family="Consolas, monospace"><text x="22" y="26">CAM 01</text><text x="82" y="26">CAM 02</text><text x="22" y="66">CAM 03</text><text x="82" y="66">CAM 04</text></g>
    <rect x="45" y="106" width="60" height="8" rx="3" fill="#2a2018"/>
  </g>

  <!-- reception desk -->
  <polygon points="300,486 1240,486 1330,570 240,570" fill="url(#rcMarble)" stroke="#8f816b" stroke-width="2"/>
  <polygon points="240,570 1330,570 1300,700 210,700" fill="url(#rcWood)" stroke="#241a12" stroke-width="2"/>
  <rect x="240" y="556" width="1090" height="18" rx="4" fill="#d9cdb6" opacity=".35"/>
  <g stroke="#241a12" stroke-width="2" opacity=".6">
    <line x1="360" y1="576" x2="344" y2="694"/><line x1="620" y1="576" x2="612" y2="696"/>
    <line x1="880" y1="576" x2="884" y2="696"/><line x1="1140" y1="576" x2="1158" y2="696"/>
  </g>
  <!-- keycard / register / note / bell -->
  <g transform="translate(620,440)">
    <rect x="0" y="0" width="190" height="58" fill="#e9e3d4" stroke="#b9ae98" transform="rotate(-2 95 29)"/>
    <line x1="12" y1="18" x2="178" y2="16" stroke="#a99e88" transform="rotate(-2 95 29)"/>
    <line x1="12" y1="30" x2="170" y2="28" stroke="#a99e88" transform="rotate(-2 95 29)"/>
    <line x1="12" y1="42" x2="150" y2="40" stroke="#a99e88" transform="rotate(-2 95 29)"/>
  </g>
  <g transform="translate(390,500) rotate(-5)">
    <rect x="0" y="0" width="120" height="74" fill="#e9e3d4" stroke="#b9ae98"/>
    <line x1="12" y1="18" x2="108" y2="18" stroke="#a99e88"/><line x1="12" y1="30" x2="94" y2="30" stroke="#a99e88"/>
    <line x1="12" y1="42" x2="102" y2="42" stroke="#a99e88"/><line x1="12" y1="54" x2="72" y2="54" stroke="#a99e88"/>
  </g>
  <g transform="translate(880,470)">
    <ellipse cx="0" cy="0" rx="18" ry="6" fill="#b9924f"/>
    <path d="M-14 0 q14 -22 28 0" fill="#c9a46a" opacity=".8"/>
    <circle cx="0" cy="-16" r="4" fill="#d9cdb6"/>
  </g>
  <!-- desk lamp -->
  <g transform="translate(1120,430)">
    <rect x="-4" y="0" width="8" height="46" fill="#3a2b1e"/>
    <path d="M-32 -18 h64 l-12 24 h-40 z" fill="#3a3f49"/>
    <ellipse cx="0" cy="50" rx="160" ry="110" fill="url(#rcLamp)" opacity=".6"/>
  </g>
  <!-- reception chair -->
  <g opacity=".8">
    <rect x="780" y="560" width="90" height="110" rx="14" fill="#1e1711" stroke="#4a3929"/>
    <rect x="816" y="670" width="14" height="90" fill="#1e1711"/>
    <rect x="760" y="752" width="126" height="10" rx="5" fill="#1e1711"/>
  </g>

  <!-- luggage cart -->
  <g transform="translate(180,610)">
    <rect x="0" y="0" width="150" height="10" rx="4" fill="#8a6a48"/>
    <rect x="10" y="10" width="10" height="90" fill="#5a4330"/><rect x="130" y="10" width="10" height="90" fill="#5a4330"/>
    <circle cx="15" cy="105" r="10" fill="#2a2018"/><circle cx="135" cy="105" r="10" fill="#2a2018"/>
    <rect x="18" y="-46" width="80" height="50" rx="6" fill="#3a2b1e" stroke="#8a6a48"/>
    <rect x="44" y="-52" width="10" height="12" fill="#8a6a48"/>
  </g>
  <!-- plant -->
  <g transform="translate(1380,520)">
    <rect x="0" y="0" width="70" height="100" rx="8" fill="#1e2937" stroke="#4a3929"/>
    <g stroke="#2f5f4a" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M35 0 q-30 -40 -56 -56"/><path d="M35 0 q6 -60 30 -80"/><path d="M35 0 q-4 -36 16 -62"/>
    </g>
  </g>

  <!-- chandelier -->
  <g transform="translate(800,60)">
    <line x1="0" y1="0" x2="0" y2="40" stroke="#4a3929" stroke-width="3"/>
    <path d="M-70 40 h140 l-20 30 h-100 z" fill="#8a6a48" opacity=".7"/>
    <g fill="#ffcf86" opacity=".8"><circle cx="-50" cy="80" r="4"/><circle cx="-20" cy="86" r="4"/><circle cx="10" cy="86" r="4"/><circle cx="42" cy="80" r="4"/></g>
    <ellipse cx="0" cy="90" rx="160" ry="60" fill="url(#rcLamp)" opacity=".3"/>
  </g>

  <!-- ambient -->
  <ellipse cx="780" cy="520" rx="480" ry="220" fill="#ffcf86" opacity=".05" filter="url(#rcBlur)"/>
  <ellipse cx="400" cy="680" rx="320" ry="160" fill="#7aa2c8" opacity=".04" filter="url(#rcBlur)"/>
  <rect width="1600" height="900" filter="url(#rcGrain)" opacity=".5"/>
  <rect width="1600" height="900" fill="url(#rcVign)"/>
  </svg>`;
}
