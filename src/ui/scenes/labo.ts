export function laboArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#243942"/><stop offset=".55" stop-color="#172830"/><stop offset="1" stop-color="#0d181e"/>
    </linearGradient>
    <linearGradient id="lFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#314851"/><stop offset=".5" stop-color="#1a2b33"/><stop offset="1" stop-color="#0a1115"/>
    </linearGradient>
    <linearGradient id="lSteel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a9bdc7"/><stop offset=".45" stop-color="#718994"/><stop offset="1" stop-color="#3c515b"/>
    </linearGradient>
    <linearGradient id="lGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8dce8" stop-opacity=".28"/><stop offset=".5" stop-color="#3a7f92" stop-opacity=".12"/><stop offset="1" stop-color="#dff6ff" stop-opacity=".04"/>
    </linearGradient>
    <linearGradient id="lDoor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#516872"/><stop offset="1" stop-color="#2d3f48"/>
    </linearGradient>
    <linearGradient id="lLight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d9f4fb" stop-opacity=".28"/><stop offset="1" stop-color="#d9f4fb" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="lVign" cx=".5" cy=".46" r=".74">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/>
    </radialGradient>
    <radialGradient id="lSample" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#67d8e8" stop-opacity=".32"/><stop offset="1" stop-color="#67d8e8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="lRed" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#e05a4f" stop-opacity=".45"/><stop offset="1" stop-color="#e05a4f" stop-opacity="0"/>
    </radialGradient>
    <filter id="lBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="lBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="lGrain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".08"/></feComponentTransfer></filter>
  </defs>

  <!-- room frame -->
  <polygon points="0,0 1600,0 1420,120 180,120" fill="#0b1419"/>
  <rect x="180" y="120" width="1240" height="480" fill="url(#lWall)"/>
  <polygon points="0,0 180,120 180,600 0,900" fill="#0a1216"/>
  <polygon points="1600,0 1420,120 1420,600 1600,900" fill="#091014"/>
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#lFloor)"/>
  <rect x="180" y="586" width="1240" height="16" fill="#0b151a" stroke="#36505a" stroke-width="2"/>

  <!-- wall panels -->
  <g stroke="#3b5661" stroke-width="2" opacity=".6">
    <line x1="180" y1="290" x2="1420" y2="290"/><line x1="180" y1="440" x2="1420" y2="440"/>
    <line x1="420" y1="120" x2="420" y2="600"/><line x1="900" y1="120" x2="900" y2="600"/>
  </g>
  <rect x="196" y="136" width="1208" height="440" fill="none" stroke="#4c6a76" stroke-opacity=".55" stroke-width="2"/>
  <rect x="204" y="144" width="1192" height="424" fill="rgba(255,255,255,.012)"/>

  <!-- floor tiles -->
  <g stroke="#7fb0c0" stroke-opacity=".1" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="500"/><line x1="400" y1="900" x2="800" y2="500"/>
    <line x1="800" y1="900" x2="800" y2="500"/><line x1="1200" y1="900" x2="800" y2="500"/>
    <line x1="1600" y1="900" x2="800" y2="500"/>
    <line x1="120" y1="650" x2="1480" y2="650"/><line x1="50" y1="730" x2="1550" y2="730"/>
    <line x1="0" y1="820" x2="1600" y2="820"/>
  </g>
  <g opacity=".14" filter="url(#lBlurS)">
    <rect x="300" y="640" width="12" height="200" fill="#d9f4fb"/>
    <rect x="1180" y="650" width="10" height="190" fill="#d9f4fb"/>
    <rect x="760" y="650" width="80" height="10" fill="#67d8e8"/>
  </g>

  <!-- hazard stripes near service door -->
  <g transform="translate(1210,600) skewX(-28)">
    <rect x="0" y="0" width="250" height="34" fill="#c9a46a" opacity=".22"/>
    <g fill="#0b1114" opacity=".65">${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 34}" y="0" width="16" height="34"/>`).join('')}</g>
  </g>

  <!-- fume hood -->
  <g>
    <rect x="420" y="196" width="300" height="260" fill="#243741" stroke="#52707c" stroke-width="4"/>
    <rect x="444" y="220" width="252" height="196" fill="#0b1a21" stroke="#4a6571" stroke-width="3"/>
    <rect x="452" y="228" width="236" height="180" fill="url(#lGlass)"/>
    <g stroke="#6d99a8" stroke-opacity=".25" stroke-width="1.5">
      <line x1="480" y1="248" x2="470" y2="388"/><line x1="540" y1="240" x2="528" y2="396"/>
      <line x1="610" y1="252" x2="596" y2="384"/><line x1="660" y1="236" x2="648" y2="398"/>
    </g>
    <g stroke="#3d5661" stroke-width="2"><line x1="500" y1="220" x2="500" y2="416"/><line x1="620" y1="220" x2="620" y2="416"/></g>
    <rect x="440" y="416" width="260" height="36" rx="6" fill="url(#lSteel)" stroke="#2f444e"/>
    <rect x="552" y="430" width="34" height="14" fill="#2f444e"/>
    <text x="570" y="188" text-anchor="middle" fill="#7d9aa6" font-size="14" font-family="Segoe UI" letter-spacing="3">HOTTE</text>
    <g fill="#c9a46a" opacity=".55"><rect x="656" y="430" width="28" height="18" rx="2"/></g>
  </g>

  <!-- biohazard sign -->
  <g transform="translate(740,220)">
    <rect x="0" y="0" width="86" height="86" rx="6" fill="#1a2c33" stroke="#c9a46a" stroke-opacity=".45" stroke-width="2"/>
    <circle cx="43" cy="38" r="18" fill="none" stroke="#c9a46a" stroke-opacity=".6" stroke-width="3"/>
    <circle cx="43" cy="38" r="7" fill="#c9a46a" opacity=".5"/>
    <text x="43" y="74" text-anchor="middle" fill="#c9a46a" fill-opacity=".55" font-size="8" font-family="Segoe UI" letter-spacing="1">BIOHAZARD</text>
  </g>

  <!-- sample shelf -->
  <g>
    <rect x="950" y="300" width="290" height="290" fill="#22343d" stroke="#4c6a76" stroke-width="4"/>
    <rect x="964" y="314" width="262" height="262" fill="#182830" stroke="#3f5a66" stroke-width="2"/>
    ${Array.from({ length: 4 }, (_, r) => `<rect x="978" y="${328 + r * 62}" width="234" height="56" fill="#12212a" stroke="#34515d" stroke-width="2"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<g transform="translate(${992 + i * 32},342)"><rect x="0" y="8" width="20" height="38" rx="3" fill="#9fd4e4" opacity=".8" stroke="#5b9db2" stroke-width="2"/><rect x="4" y="2" width="12" height="8" fill="#c4eaf4" opacity=".8" stroke="#5b9db2"/></g>`).join('')}
    <rect x="1152" y="390" width="52" height="52" fill="#3a1414" opacity=".65"/>
    <rect x="1152" y="390" width="52" height="52" fill="none" stroke="#c75c5c" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="1178" y="422" text-anchor="middle" fill="#e88a82" font-size="9" font-family="Segoe UI">NX-17</text>
    <ellipse cx="1178" cy="410" rx="90" ry="80" fill="url(#lSample)" opacity=".45"/>
    <rect x="1000" y="590" width="180" height="10" rx="4" fill="#2f444e"/>
    <text x="1095" y="286" text-anchor="middle" fill="#7d9aa6" font-size="12" font-family="Segoe UI" letter-spacing="2">ÉCHANTILLONS</text>
  </g>

  <!-- coat rack + blouse -->
  <g>
    <rect x="300" y="240" width="18" height="420" fill="#4b626c"/>
    <rect x="240" y="240" width="140" height="16" rx="8" fill="#4b626c"/>
    <circle cx="309" cy="236" r="9" fill="#6c8894"/>
    <path d="M256 330 q34 -26 54 -26 q20 0 54 26 l-6 190 q-48 26 -96 0 z" fill="#dbe7ec" stroke="#8fa8b3" stroke-width="3"/>
    <path d="M290 306 v230 M328 306 v230" stroke="#aebfc8" stroke-width="2"/>
    <rect x="300" y="352" width="44" height="30" rx="3" fill="#f4f8fa" stroke="#9fb4bf"/>
    <text x="322" y="364" text-anchor="middle" fill="#3f4c55" font-size="7" font-family="Segoe UI">VISITEUR</text>
    <text x="322" y="375" text-anchor="middle" fill="#3f4c55" font-size="8" font-family="Segoe UI">N. BERNARD</text>
    <circle cx="320" cy="330" r="7" fill="#7a5f42" opacity=".5"/>
    <circle cx="296" cy="430" r="10" fill="#b07a4a" opacity=".3"/>
    <ellipse cx="312" cy="662" rx="100" ry="16" fill="#000" opacity=".4" filter="url(#lBlurS)"/>
  </g>

  <!-- service door -->
  <g>
    <rect x="1290" y="220" width="220" height="400" fill="#182730" stroke="#4c6a76" stroke-width="5"/>
    <rect x="1312" y="248" width="176" height="344" rx="4" fill="url(#lDoor)" stroke="#2f444e" stroke-width="2"/>
    <rect x="1332" y="278" width="136" height="110" fill="#07141b" opacity=".75" stroke="#3f5a66"/>
    <rect x="1450" y="420" width="20" height="60" rx="6" fill="#22343d"/>
    <g stroke="#1a2b33" stroke-width="2" opacity=".8">
      <line x1="1302" y1="420" x2="1310" y2="450"/><line x1="1302" y1="440" x2="1310" y2="470"/>
    </g>
    <rect x="1300" y="470" width="30" height="54" rx="4" fill="#2f444e" stroke="#1b2b33"/>
    <circle cx="1315" cy="490" r="4" fill="#39d98a"/>
    <text x="1400" y="650" text-anchor="middle" fill="#7d9aa6" font-size="14" font-family="Segoe UI" letter-spacing="2">SORTIE SERVICE</text>
    <ellipse cx="1400" cy="300" rx="80" ry="60" fill="url(#lRed)" opacity=".18"/>
    <circle cx="1380" cy="212" r="5" fill="#e05a4f" opacity=".8"/>
  </g>

  <!-- central bench -->
  <polygon points="300,500 1210,500 1280,548 240,548" fill="url(#lSteel)" stroke="#2c414b" stroke-width="3"/>
  <rect x="240" y="548" width="1040" height="22" fill="#3c515b"/>
  <rect x="300" y="570" width="36" height="190" fill="#2c414b"/><rect x="1180" y="570" width="36" height="190" fill="#2c414b"/>
  <rect x="720" y="570" width="36" height="190" fill="#2c414b"/>
  <line x1="300" y1="506" x2="1210" y2="506" stroke="#d9f4fb" stroke-opacity=".35" stroke-width="2"/>

  <!-- lab equipment on bench -->
  <g>
    <rect x="392" y="452" width="56" height="48" rx="4" fill="#2a4651" stroke="#5b8a99" stroke-width="2"/>
    <rect x="400" y="440" width="40" height="14" rx="3" fill="#3d606c" stroke="#5b8a99"/>
    <circle cx="420" cy="476" r="12" fill="#67d8e8" opacity=".25"/>
    <ellipse cx="420" cy="500" rx="42" ry="8" fill="#000" opacity=".3"/>
  </g>
  <g>
    <rect x="680" y="420" width="80" height="80" rx="6" fill="#2a4651" stroke="#5b8a99" stroke-width="3"/>
    <circle cx="720" cy="460" r="24" fill="#173a44" stroke="#5b8a99"/>
    <circle cx="720" cy="460" r="10" fill="#67d8e8" opacity=".35"/>
    <rect x="700" y="486" width="40" height="8" rx="3" fill="#3c515b"/>
  </g>
  <g>
    <rect x="800" y="468" width="60" height="32" rx="4" fill="#2a4651" stroke="#5b8a99"/>
    <g stroke="#67d8e8" stroke-opacity=".4" stroke-width="2"><line x1="810" y1="476" x2="850" y2="476"/><line x1="810" y1="484" x2="842" y2="484"/></g>
  </g>

  <!-- broken beaker area -->
  <g transform="translate(500,600)">
    <ellipse cx="60" cy="60" rx="90" ry="20" fill="#3a7f92" opacity=".12"/>
    <polygon points="20,20 46,4 58,30 34,38" fill="#c8ecf5" opacity=".75" stroke="#7fb0c0"/>
    <polygon points="70,10 94,0 108,26 86,30" fill="#c8ecf5" opacity=".65" stroke="#7fb0c0"/>
    <polygon points="108,34 124,22 132,42 114,48" fill="#c8ecf5" opacity=".6" stroke="#7fb0c0"/>
    <polygon points="0,42 22,34 30,52 8,56" fill="#c8ecf5" opacity=".55" stroke="#7fb0c0"/>
    <rect x="56" y="-20" width="28" height="26" rx="3" fill="#c8ecf5" opacity=".8" stroke="#7fb0c0"/>
    <path d="M60 6 h20 l-4 10 h-12 z" fill="#7fb0c0" opacity=".5"/>
    <ellipse cx="70" cy="46" rx="46" ry="10" fill="#67d8e8" opacity=".14"/>
  </g>

  <!-- sink far left -->
  <g>
    <rect x="180" y="500" width="90" height="50" rx="6" fill="#3c515b" stroke="#2c414b" stroke-width="2"/>
    <rect x="194" y="512" width="62" height="26" rx="4" fill="#182830"/>
    <path d="M240 512 q0 -30 -24 -30" fill="none" stroke="#4c6a76" stroke-width="6"/>
  </g>

  <!-- ceiling lights -->
  <g>
    <rect x="380" y="60" width="420" height="14" rx="6" fill="#cfeef6" opacity=".8"/>
    <rect x="900" y="60" width="420" height="14" rx="6" fill="#cfeef6" opacity=".8"/>
    <polygon points="380,74 800,74 880,600 300,600" fill="url(#lLight)" opacity=".16"/>
    <polygon points="900,74 1320,74 1400,600 820,600" fill="url(#lLight)" opacity=".16"/>
  </g>

  <!-- ambient glows and shadows -->
  <ellipse cx="800" cy="620" rx="640" ry="180" fill="#67d8e8" opacity=".025" filter="url(#lBlur)"/>
  <ellipse cx="1178" cy="410" rx="200" ry="180" fill="#67d8e8" opacity=".05" filter="url(#lBlur)"/>
  <ellipse cx="1400" cy="300" rx="120" ry="120" fill="#e05a4f" opacity=".025" filter="url(#lBlur)"/>
  <ellipse cx="800" cy="850" rx="620" ry="80" fill="#000" opacity=".45" filter="url(#lBlur)"/>

  <rect width="1600" height="900" filter="url(#lGrain)" opacity=".45"/>
  <rect width="1600" height="900" fill="url(#lVign)"/>
  </svg>`;
}
