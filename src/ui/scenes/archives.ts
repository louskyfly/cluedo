export function archivesArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="aWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1c1813"/><stop offset=".55" stop-color="#14110d"/><stop offset="1" stop-color="#0b0907"/>
    </linearGradient>
    <linearGradient id="aFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b251e"/><stop offset=".5" stop-color="#1d1913"/><stop offset="1" stop-color="#0e0b08"/>
    </linearGradient>
    <linearGradient id="aCab" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4b4c4b"/><stop offset=".5" stop-color="#3a3c3d"/><stop offset="1" stop-color="#252728"/>
    </linearGradient>
    <linearGradient id="aCabTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5c5d5b"/><stop offset="1" stop-color="#3a3c3c"/>
    </linearGradient>
    <linearGradient id="aLamp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe0a8" stop-opacity=".65"/><stop offset="1" stop-color="#ffe0a8" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="aGlow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffcf86" stop-opacity=".35"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="aVign" cx=".5" cy=".46" r=".72">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/>
    </radialGradient>
    <filter id="aBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="aBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="aGrain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer></filter>
  </defs>

  <polygon points="0,0 1600,0 1420,120 180,120" fill="#0a0806"/>
  <rect x="180" y="120" width="1240" height="500" fill="url(#aWall)"/>
  <polygon points="0,0 180,120 180,620 0,900" fill="#0c0a08"/>
  <polygon points="1600,0 1420,120 1420,620 1600,900" fill="#0a0806"/>
  <polygon points="0,900 180,620 1420,620 1600,900" fill="url(#aFloor)"/>

  <!-- back wall + narrow aisle -->
  <rect x="700" y="200" width="200" height="420" fill="#120f0c" stroke="#2a251e" stroke-width="2"/>
  <rect x="740" y="230" width="120" height="390" fill="#0b0907"/>
  <ellipse cx="800" cy="300" rx="90" ry="140" fill="#ffcf86" opacity=".035" filter="url(#aBlur)"/>

  <!-- left cabinet row -->
  <g>
    <rect x="90" y="150" width="330" height="520" rx="6" fill="url(#aCab)" stroke="#202223" stroke-width="4"/>
    <rect x="104" y="164" width="302" height="492" fill="#2f3132"/>
    ${Array.from({ length: 6 }, (_, r) => `<g>
      <rect x="116" y="${178 + r * 78}" width="278" height="62" rx="3" fill="#3a3c3d" stroke="#232526" stroke-width="2"/>
      <rect x="250" y="${204 + r * 78}" width="52" height="9" rx="4" fill="#7a7d7c"/>
      <rect x="136" y="${188 + r * 78}" width="56" height="12" rx="2" fill="#d9d2c3" opacity=".55"/>
    </g>`).join('')}
    <rect x="90" y="150" width="330" height="20" fill="url(#aCabTop)"/>
  </g>

  <!-- hidden note peeking behind left cabinet -->
  <g transform="translate(370,360) rotate(-7)">
    <rect x="0" y="0" width="78" height="62" fill="#efe9da" stroke="#b9b09c"/>
    <g stroke="#9a9282" stroke-width="2"><line x1="10" y1="16" x2="66" y2="14"/><line x1="10" y1="27" x2="60" y2="25"/><line x1="10" y1="38" x2="66" y2="36"/><line x1="10" y1="49" x2="48" y2="47"/></g>
    <rect x="56" y="46" width="16" height="12" fill="#c9a46a" opacity=".5"/>
  </g>

  <!-- right cabinet row -->
  <g>
    <rect x="1120" y="140" width="340" height="530" rx="6" fill="url(#aCab)" stroke="#202223" stroke-width="4"/>
    <rect x="1134" y="154" width="312" height="502" fill="#2f3132"/>
    ${[0, 1, 3, 4, 5].map((r) => `<g>
      <rect x="1146" y="${168 + r * 78}" width="288" height="62" rx="3" fill="#3a3c3d" stroke="#232526" stroke-width="2"/>
      <rect x="1268" y="${194 + r * 78}" width="52" height="9" rx="4" fill="#7a7d7c"/>
      <rect x="1166" y="${178 + r * 78}" width="66" height="12" rx="2" fill="#d9d2c3" opacity=".55"/>
    </g>`).join('')}
    <!-- empty slot -->
    <rect x="1146" y="324" width="288" height="62" rx="3" fill="#0d0b09" stroke="#c9a46a" stroke-opacity=".4" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="1290" y="360" text-anchor="middle" fill="#c9a46a" font-size="13" font-family="Segoe UI" letter-spacing="2">DOSSIER NX</text>
    <rect x="1120" y="140" width="340" height="20" fill="url(#aCabTop)"/>
  </g>

  <!-- middle cabinet behind box -->
  <g>
    <rect x="520" y="220" width="150" height="400" fill="url(#aCab)" stroke="#202223" stroke-width="3" opacity=".9"/>
    ${Array.from({ length: 5 }, (_, r) => `<rect x="532" y="${234 + r * 74}" width="126" height="58" rx="3" fill="#353738" stroke="#232526"/>`).join('')}
  </g>

  <!-- floor perspective + dust -->
  <g stroke="#c9a46a" stroke-opacity=".06" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="540"/><line x1="400" y1="900" x2="800" y2="540"/>
    <line x1="800" y1="900" x2="800" y2="540"/><line x1="1200" y1="900" x2="800" y2="540"/>
    <line x1="1600" y1="900" x2="800" y2="540"/>
  </g>

  <!-- moved cardboard box -->
  <g transform="translate(560,540)">
    <ellipse cx="120" cy="150" rx="140" ry="26" fill="#000" opacity=".45" filter="url(#aBlurS)"/>
    <rect x="0" y="40" width="240" height="130" fill="#6b5842" stroke="#3d3126" stroke-width="3"/>
    <rect x="12" y="52" width="216" height="106" fill="#7a654c"/>
    <path d="M0 40 l26 -30 h240 l-26 30 z" fill="#806c52" stroke="#3d3126" stroke-width="3"/>
    <text x="120" y="92" text-anchor="middle" fill="#efe6d2" font-size="16" font-family="Segoe UI" letter-spacing="1">PROJET</text>
    <text x="120" y="116" text-anchor="middle" fill="#efe6d2" font-size="16" font-family="Segoe UI" letter-spacing="1">NÉMÉSIS</text>
    <rect x="150" y="60" width="56" height="20" fill="#e8dcc4" opacity=".65"/>
    <rect x="0" y="150" width="240" height="14" fill="#4a3b2d"/>
  </g>
  <!-- dust-free trace on floor -->
  <rect x="540" y="700" width="290" height="50" rx="8" fill="#14110d" opacity=".5"/>
  <rect x="550" y="706" width="270" height="38" rx="6" fill="#2d2821" opacity=".45"/>

  <!-- hanging lamps -->
  <g>
    <line x1="420" y1="0" x2="420" y2="120" stroke="#2a241d" stroke-width="4"/>
    <path d="M370 120 h100 l-18 34 h-64 z" fill="#4a3f2f" stroke="#2a241d"/>
    <ellipse cx="420" cy="154" rx="32" ry="6" fill="#ffe0a8" opacity=".5"/>
    <polygon points="388,154 452,154 540,620 300,620" fill="url(#aLamp)" opacity=".55"/>
    <line x1="1060" y1="0" x2="1060" y2="160" stroke="#2a241d" stroke-width="4"/>
    <path d="M1010 160 h100 l-18 34 h-64 z" fill="#4a3f2f" stroke="#2a241d"/>
    <ellipse cx="1060" cy="194" rx="32" ry="6" fill="#ffe0a8" opacity=".5"/>
    <polygon points="1028,194 1092,194 1180,660 940,660" fill="url(#aLamp)" opacity=".35"/>
  </g>

  <!-- dust motes -->
  <g fill="#ffe0a8" opacity=".35">
    <circle cx="360" cy="300" r="2"/><circle cx="480" cy="260" r="1.5"/><circle cx="620" cy="220" r="2"/>
    <circle cx="760" cy="340" r="1.5"/><circle cx="900" cy="280" r="2"/><circle cx="1020" cy="380" r="1.5"/>
    <circle cx="1180" cy="240" r="2"/><circle cx="1320" cy="330" r="1.5"/><circle cx="520" cy="480" r="1.5"/>
    <circle cx="860" cy="520" r="2"/><circle cx="1100" cy="540" r="1.5"/><circle cx="240" cy="400" r="1.5"/>
  </g>

  <!-- ambient -->
  <ellipse cx="420" cy="520" rx="280" ry="180" fill="#ffcf86" opacity=".06" filter="url(#aBlur)"/>
  <ellipse cx="1060" cy="560" rx="300" ry="200" fill="#ffcf86" opacity=".04" filter="url(#aBlur)"/>
  <rect width="1600" height="900" fill="url(#aVign)"/>
  <rect width="1600" height="900" filter="url(#aGrain)" opacity=".65"/>
  </svg>`;
}
