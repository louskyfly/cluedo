export function parkingArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#141b24"/><stop offset=".55" stop-color="#0d131a"/><stop offset="1" stop-color="#070a0e"/>
    </linearGradient>
    <linearGradient id="pGround" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a333c"/><stop offset=".5" stop-color="#1a222a"/><stop offset="1" stop-color="#0a0e12"/>
    </linearGradient>
    <linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07131f"/><stop offset=".6" stop-color="#0d2233"/><stop offset="1" stop-color="#040a0f"/>
    </linearGradient>
    <radialGradient id="pLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffcf86" stop-opacity=".55"/><stop offset=".4" stop-color="#ffcf86" stop-opacity=".16"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pExit" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#39d98a" stop-opacity=".35"/><stop offset="1" stop-color="#39d98a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pVign" cx=".5" cy=".46" r=".72">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/>
    </radialGradient>
    <filter id="pBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="pBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="pGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer></filter>
  </defs>

  <rect width="1600" height="900" fill="#060a0e"/>
  <rect x="0" y="0" width="1600" height="470" fill="url(#pSky)"/>
  <ellipse cx="1160" cy="120" rx="280" ry="140" fill="#7aa2c8" opacity=".08" filter="url(#pBlur)"/>

  <!-- building wall back -->
  <rect x="0" y="120" width="1600" height="430" fill="url(#pWall)"/>
  <g stroke="#26313d" stroke-width="2" opacity=".7">
    <line x1="0" y1="220" x2="1600" y2="220"/><line x1="0" y1="340" x2="1600" y2="340"/>
    <line x1="360" y1="120" x2="360" y2="550"/><line x1="760" y1="120" x2="760" y2="550"/>
    <line x1="1180" y1="120" x2="1180" y2="550"/>
  </g>
  <!-- brick texture -->
  <g stroke="#1a222b" stroke-width="1" opacity=".4">
    ${Array.from({ length: 6 }, (_, r) => `<line x1="0" y1="${160 + r * 60}" x2="1600" y2="${160 + r * 60}"/>`).join('')}
  </g>

  <!-- ground -->
  <rect x="0" y="550" width="1600" height="350" fill="url(#pGround)"/>
  <g stroke="#4a5a6a" stroke-opacity=".12" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="520"/><line x1="400" y1="900" x2="800" y2="520"/>
    <line x1="800" y1="900" x2="800" y2="520"/><line x1="1200" y1="900" x2="800" y2="520"/>
    <line x1="1600" y1="900" x2="800" y2="520"/>
    <line x1="0" y1="680" x2="1600" y2="680"/><line x1="0" y1="780" x2="1600" y2="780"/>
  </g>
  <!-- puddles -->
  <g fill="#7aa2c8" opacity=".12" filter="url(#pBlurS)">
    <ellipse cx="500" cy="760" rx="150" ry="30"/><ellipse cx="1180" cy="820" rx="180" ry="34"/>
    <ellipse cx="860" cy="700" rx="90" ry="18"/>
  </g>

  <!-- service door -->
  <g>
    <rect x="780" y="300" width="170" height="250" fill="#1a222b" stroke="#3a4a5a" stroke-width="4"/>
    <rect x="798" y="318" width="134" height="214" fill="#0e151c"/>
    <rect x="830" y="330" width="70" height="40" fill="#0a1118" stroke="#2a3a4a"/>
    <text x="865" y="355" text-anchor="middle" fill="#7aa2c8" font-size="9" font-family="Segoe UI" letter-spacing="2">LIVRAISONS</text>
    <rect x="900" y="440" width="18" height="50" rx="5" fill="#4a5a6a"/>
    <rect x="808" y="440" width="34" height="50" rx="4" fill="#2a3440" stroke="#4a5a6a"/>
    <circle cx="825" cy="456" r="4" fill="#39d98a"/>
    <ellipse cx="865" cy="500" rx="120" ry="60" fill="url(#pExit)" opacity=".3"/>
    <text x="865" y="585" text-anchor="middle" fill="#7d9aa6" font-size="12" font-family="Segoe UI" letter-spacing="2">SORTIE DE SERVICE</text>
  </g>

  <!-- security camera top right -->
  <g transform="translate(1210,170)">
    <rect x="-8" y="0" width="16" height="60" fill="#2a3440"/>
    <rect x="-46" y="50" width="92" height="38" rx="8" fill="#3a4a5a" stroke="#1a222b" stroke-width="2"/>
    <circle cx="0" cy="69" r="13" fill="#060a0e" stroke="#6d8096" stroke-width="2"/>
    <circle cx="0" cy="69" r="5" fill="#2b3b4d"/>
    <circle cx="30" cy="58" r="4" fill="#d9534f"/>
    <path d="M-38 88 l-30 90 l100 0 l-30 -90" fill="#7aa2c8" opacity=".05"/>
  </g>

  <!-- dumpsters left -->
  <g>
    <rect x="100" y="450" width="260" height="130" rx="8" fill="#24313a" stroke="#3e515e" stroke-width="4"/>
    <rect x="112" y="462" width="236" height="40" fill="#1b2630"/>
    <g stroke="#3e515e" stroke-width="3"><line x1="112" y1="502" x2="348" y2="502"/><line x1="170" y1="462" x2="170" y2="580"/><line x1="290" y1="462" x2="290" y2="580"/></g>
    <rect x="130" y="580" width="30" height="20" fill="#141c23"/><rect x="300" y="580" width="30" height="20" fill="#141c23"/>
    <rect x="140" y="420" width="120" height="30" rx="4" fill="#3a4a56" stroke="#5a6a78"/>
    <g stroke="#5a6a78" stroke-width="2"><line x1="150" y1="430" x2="250" y2="430"/><line x1="150" y1="440" x2="230" y2="440"/></g>
  </g>

  <!-- delivery van -->
  <g>
    <rect x="1080" y="520" width="350" height="170" rx="10" fill="#2a3340" stroke="#4a5a6a" stroke-width="4"/>
    <rect x="1100" y="540" width="220" height="80" fill="#1a222b" stroke="#3a4a5a"/>
    <rect x="1330" y="550" width="80" height="50" fill="#0e151c" stroke="#3a4a5a"/>
    <rect x="1090" y="630" width="330" height="40" rx="6" fill="#1a222b"/>
    <circle cx="1160" cy="690" r="32" fill="#0a0e12" stroke="#3a4a5a" stroke-width="4"/>
    <circle cx="1400" cy="690" r="32" fill="#0a0e12" stroke="#3a4a5a" stroke-width="4"/>
    <rect x="1120" y="560" width="160" height="10" rx="4" fill="#9fc7e8" opacity=".2"/>
    <text x="1255" y="620" text-anchor="middle" fill="#7d9aa6" font-size="11" font-family="Segoe UI" letter-spacing="2">TRANSLOG</text>
    <ellipse cx="1255" cy="740" rx="190" ry="24" fill="#000" opacity=".45" filter="url(#pBlurS)"/>
  </g>

  <!-- tire marks -->
  <g stroke="#0a0e12" stroke-width="10" opacity=".55" stroke-linecap="round">
    <path d="M620 750 q100 -40 210 -20"/><path d="M600 790 q110 -44 230 -22"/>
  </g>
  <g stroke="#4a5a6a" stroke-width="2" opacity=".25"><path d="M620 750 q100 -40 210 -20"/><path d="M600 790 q110 -44 230 -22"/></g>

  <!-- cufflink on ground -->
  <g transform="translate(890,690)">
    <circle cx="0" cy="0" r="12" fill="#2a3440" stroke="#9fc7e8" stroke-width="2"/>
    <circle cx="0" cy="0" r="6" fill="#0e151c" stroke="#c9a46a" stroke-width="1.5"/>
    <text x="0" y="3" text-anchor="middle" fill="#c9a46a" font-size="6" font-family="Georgia, serif">AD</text>
    <ellipse cx="0" cy="18" rx="30" ry="8" fill="#7aa2c8" opacity=".12" filter="url(#pBlurS)"/>
  </g>

  <!-- streetlamp -->
  <g>
    <rect x="560" y="180" width="10" height="380" fill="#2a3440"/>
    <path d="M520 180 h90 l-18 30 h-54 z" fill="#3a4a5a"/>
    <ellipse cx="565" cy="210" rx="120" ry="70" fill="url(#pLamp)" opacity=".6"/>
    <polygon points="500,210 630,210 760,700 380,700" fill="#ffcf86" opacity=".03"/>
  </g>

  <!-- chain-link fence right -->
  <g stroke="#3e515e" stroke-width="2" opacity=".5">
    <line x1="1480" y1="180" x2="1480" y2="700"/><line x1="1540" y1="160" x2="1540" y2="700"/>
    <line x1="1460" y1="240" x2="1600" y2="200"/><line x1="1460" y1="320" x2="1600" y2="280"/>
    <line x1="1460" y1="400" x2="1600" y2="360"/><line x1="1460" y1="480" x2="1600" y2="440"/>
    <line x1="1460" y1="560" x2="1600" y2="520"/><line x1="1460" y1="640" x2="1600" y2="600"/>
  </g>

  <!-- fog -->
  <ellipse cx="800" cy="700" rx="760" ry="120" fill="#9fb6c9" opacity=".04" filter="url(#pBlur)"/>
  <rect width="1600" height="900" filter="url(#pGrain)" opacity=".55"/>
  <rect width="1600" height="900" fill="url(#pVign)"/>
  </svg>`;
}
