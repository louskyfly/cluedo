export function infoArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0c1720"/><stop offset=".55" stop-color="#08131c"/><stop offset="1" stop-color="#050c12"/>
    </linearGradient>
    <linearGradient id="iFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1c2a36"/><stop offset=".5" stop-color="#101b25"/><stop offset="1" stop-color="#070c12"/>
    </linearGradient>
    <linearGradient id="iRack" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1e2b38"/><stop offset=".5" stop-color="#141f2a"/><stop offset="1" stop-color="#0b1219"/>
    </linearGradient>
    <linearGradient id="iSteel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a4754"/><stop offset="1" stop-color="#1d2631"/>
    </linearGradient>
    <linearGradient id="iScreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#04202a"/><stop offset="1" stop-color="#021016"/>
    </linearGradient>
    <linearGradient id="iLightCone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#67d8e8" stop-opacity=".14"/><stop offset="1" stop-color="#67d8e8" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="iGlow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#55f0d0" stop-opacity=".35"/><stop offset="1" stop-color="#55f0d0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="iVign" cx=".5" cy=".46" r=".74">
      <stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
    </radialGradient>
    <filter id="iBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="iBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="iGrain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer></filter>
  </defs>

  <polygon points="0,0 1600,0 1420,140 180,140" fill="#050a10"/>
  <rect x="180" y="140" width="1240" height="460" fill="url(#iWall)"/>
  <polygon points="0,0 180,140 180,600 0,900" fill="#060b11"/>
  <polygon points="1600,0 1420,140 1420,600 1600,900" fill="#050a10"/>
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#iFloor)"/>
  <g stroke="#64a0b8" stroke-opacity=".09" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="520"/><line x1="400" y1="900" x2="800" y2="520"/>
    <line x1="800" y1="900" x2="800" y2="520"/><line x1="1200" y1="900" x2="800" y2="520"/>
    <line x1="1600" y1="900" x2="800" y2="520"/>
    <line x1="120" y1="650" x2="1480" y2="650"/><line x1="60" y1="720" x2="1540" y2="720"/>
    <line x1="0" y1="810" x2="1600" y2="810"/>
  </g>

  <!-- cable trays ceiling -->
  <g stroke="#2a3948" stroke-width="6" fill="none" opacity=".8">
    <path d="M120 120 L1480 120"/><path d="M120 150 L1480 150"/>
  </g>
  <g stroke="#1d2a36" stroke-width="3" fill="none">
    <path d="M240 150 v120 q0 20 20 20 h100"/><path d="M420 150 v90 h-80"/><path d="M1180 150 v110 q0 24 24 24 h120"/>
    <path d="M1380 150 v180"/>
  </g>

  <!-- server racks left -->
  ${[100, 300].map((x, idx) => `<g>
    <rect x="${x}" y="176" width="170" height="430" rx="7" fill="url(#iRack)" stroke="#2d4050" stroke-width="2"/>
    <rect x="${x + 10}" y="188" width="150" height="406" fill="#0b131b" rx="3"/>
    ${Array.from({ length: 13 }, (_, i) => `<rect x="${x + 18}" y="${200 + i * 30}" width="134" height="21" rx="2" fill="#101b25"/><circle cx="${x + 30}" cy="${210 + i * 30}" r="3" fill="${(i + idx) % 4 === 0 ? '#d4b06a' : '#39d98a'}" opacity=".9"/><circle cx="${x + 42}" cy="${210 + i * 30}" r="2" fill="#4a6274"/>`).join('')}
    <rect x="${x + 10}" y="590" width="150" height="16" fill="#1a2632"/>
  </g>`).join('')}

  <!-- server racks right -->
  ${[1330, 1490].map((x, idx) => `<g>
    <rect x="${x}" y="176" width="110" height="430" rx="7" fill="url(#iRack)" stroke="#2d4050" stroke-width="2"/>
    <rect x="${x + 8}" y="188" width="94" height="406" fill="#0b131b" rx="3"/>
    ${Array.from({ length: 13 }, (_, i) => `<rect x="${x + 14}" y="${200 + i * 30}" width="82" height="21" rx="2" fill="#101b25"/><circle cx="${x + 24}" cy="${210 + i * 30}" r="3" fill="${(i + idx) % 3 === 0 ? '#39d98a' : '#2d5f8a'}"/>`).join('')}
  </g>`).join('')}

  <!-- back rack center-right -->
  <rect x="1130" y="200" width="160" height="400" rx="7" fill="url(#iRack)" stroke="#2d4050" stroke-width="2"/>
  <rect x="1140" y="212" width="140" height="376" fill="#0b131b" rx="3"/>
  ${Array.from({ length: 11 }, (_, i) => `<rect x="1148" y="${224 + i * 32}" width="124" height="22" rx="2" fill="#101b25"/><circle cx="1160" cy="${235 + i * 32}" r="3" fill="${i % 2 === 0 ? '#39d98a' : '#d4b06a'}"/>`).join('')}

  <!-- console desk -->
  <polygon points="470,530 1200,530 1270,600 410,600" fill="#1a2530" stroke="#2d3d4d" stroke-width="3"/>
  <rect x="410" y="600" width="860" height="24" fill="#131d26"/>
  <rect x="450" y="624" width="34" height="160" fill="#101922"/><rect x="1200" y="624" width="34" height="160" fill="#101922"/>
  <!-- desk edge glow -->
  <line x1="470" y1="536" x2="1200" y2="536" stroke="#67d8e8" stroke-opacity=".18" stroke-width="3"/>

  <!-- logs monitor -->
  <rect x="540" y="300" width="330" height="220" rx="8" fill="#0b141c" stroke="#2f4658" stroke-width="4"/>
  <rect x="556" y="316" width="298" height="172" rx="3" fill="url(#iScreen)"/>
  <g fill="#5fe3c0" opacity=".85" font-family="Consolas, monospace" font-size="12">
    <text x="570" y="342">22:41  evasseur  login</text>
    <text x="570" y="364">22:47  copy → NOIR-01</text>
    <text x="570" y="386">       4.2 GB / NX</text>
    <text x="570" y="408">22:53  purge partial</text>
    <text x="570" y="430">22:58  logout</text>
    <text x="570" y="452" fill="#d4b06a">23:05  lmorel view logs</text>
    <text x="570" y="474" fill="#d4b06a">23:09  lmorel logout</text>
  </g>
  <rect x="636" y="520" width="34" height="30" fill="#0b141c"/>
  <rect x="600" y="550" width="108" height="10" rx="4" fill="#17232d"/>

  <!-- camera monitor -->
  <rect x="980" y="270" width="340" height="250" rx="8" fill="#0b141c" stroke="#2f4658" stroke-width="4"/>
  <rect x="996" y="286" width="308" height="196" rx="3" fill="#040b10"/>
  <g stroke="#1d3444" stroke-width="2">
    <rect x="1006" y="296" width="140" height="80" fill="#0a1620"/><rect x="1154" y="296" width="140" height="80" fill="#0a1620"/>
    <rect x="1006" y="384" width="140" height="80" fill="#0c0808"/><rect x="1154" y="384" width="140" height="80" fill="#0a1620"/>
  </g>
  <g fill="#20394a" font-family="Consolas, monospace" font-size="9">
    <text x="1014" y="308">CAM 01 HALL</text><text x="1162" y="308">CAM 02 COULOIR</text>
    <text x="1014" y="396">CAM 03 ARCHIVES</text><text x="1162" y="396">CAM 04 LABO</text>
  </g>
  <rect x="1006" y="384" width="140" height="80" fill="#120b0b" opacity=".6"/>
  <text x="1076" y="428" text-anchor="middle" fill="#d9534f" font-size="13" font-family="Segoe UI" letter-spacing="1">NO SIGNAL</text>
  <text x="1076" y="444" text-anchor="middle" fill="#d9534f" font-size="10" font-family="Segoe UI">22:00 — 23:00</text>
  <rect x="1120" y="520" width="50" height="28" fill="#0b141c"/>
  <rect x="1080" y="548" width="130" height="10" rx="4" fill="#17232d"/>

  <!-- keyboard + mouse on desk -->
  <rect x="760" y="556" width="240" height="28" rx="4" fill="#0c151d" stroke="#1e2c38"/>
  <g stroke="#1a2a36" stroke-width="2">${Array.from({ length: 10 }, (_, i) => `<line x1="${770 + i * 22}" y1="562" x2="${770 + i * 22}" y2="576"/>`).join('')}</g>
  <ellipse cx="1040" cy="570" rx="16" ry="10" fill="#0c151d" stroke="#1e2c38"/>

  <!-- USB under desk -->
  <g transform="translate(852,680) rotate(18)">
    <rect x="0" y="0" width="46" height="18" rx="3" fill="#0a0d10" stroke="#3a4a58"/>
    <rect x="44" y="4" width="16" height="10" rx="1" fill="#657786"/>
    <rect x="58" y="6" width="4" height="6" fill="#9ab"/>
  </g>
  <ellipse cx="880" cy="720" rx="66" ry="12" fill="#67d8e8" opacity=".05" filter="url(#iBlurS)"/>

  <!-- bin with paper -->
  <g transform="translate(350,640)">
    <path d="M0 0 h110 l-12 130 h-86 z" fill="#1c2936" stroke="#31465a" stroke-width="3"/>
    <ellipse cx="55" cy="0" rx="55" ry="14" fill="#263746" stroke="#3a5268"/>
    <rect x="22" y="-26" width="62" height="42" rx="4" fill="#e6dfcf" transform="rotate(-16 53 -5)"/>
    <line x1="30" y1="-8" x2="72" y2="-16" stroke="#b9b0a0" stroke-width="2" transform="rotate(-16 53 -5)"/>
  </g>

  <!-- floor vents -->
  <g fill="#0d161e" stroke="#1e2f3d">
    <rect x="260" y="700" width="90" height="34" rx="4"/><rect x="1000" y="720" width="90" height="34" rx="4"/>
  </g>

  <!-- light fixtures -->
  <g>
    <rect x="620" y="60" width="360" height="10" rx="4" fill="#23303d"/>
    <rect x="640" y="64" width="320" height="5" rx="2" fill="#7fe9f5" opacity=".5"/>
    <polygon points="620,70 980,70 1080,600 520,600" fill="url(#iLightCone)" opacity=".6"/>
  </g>
  <g>
    <rect x="180" y="90" width="120" height="8" rx="4" fill="#1c2834"/>
    <rect x="1300" y="90" width="120" height="8" rx="4" fill="#1c2834"/>
  </g>

  <!-- monitor glows -->
  <ellipse cx="700" cy="440" rx="260" ry="160" fill="url(#iGlow)" opacity=".45"/>
  <ellipse cx="1150" cy="430" rx="240" ry="160" fill="#2d5f8a" opacity=".06" filter="url(#iBlur)"/>
  <ellipse cx="240" cy="350" rx="180" ry="220" fill="#39d98a" opacity=".03" filter="url(#iBlur)"/>
  <ellipse cx="800" cy="760" rx="540" ry="120" fill="#67d8e8" opacity=".03" filter="url(#iBlur)"/>

  <rect width="1600" height="900" filter="url(#iGrain)" opacity=".65"/>
  <rect width="1600" height="900" fill="url(#iVign)"/>
  </svg>`;
}
