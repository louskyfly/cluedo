export function roomArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rmWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#202a38"/><stop offset=".55" stop-color="#151d28"/><stop offset="1" stop-color="#0c1119"/>
    </linearGradient>
    <linearGradient id="rmFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3b3a3a"/><stop offset=".45" stop-color="#282828"/><stop offset="1" stop-color="#121212"/>
    </linearGradient>
    <linearGradient id="rmBed" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e7e1d4"/><stop offset=".45" stop-color="#cfc7b7"/><stop offset="1" stop-color="#9d9484"/>
    </linearGradient>
    <linearGradient id="rmNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#071524"/><stop offset=".5" stop-color="#0d2a40"/><stop offset="1" stop-color="#040b12"/>
    </linearGradient>
    <linearGradient id="rmWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5a4330"/><stop offset="1" stop-color="#33251a"/>
    </linearGradient>
    <radialGradient id="rmLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffcf86" stop-opacity=".5"/><stop offset=".4" stop-color="#ffcf86" stop-opacity=".15"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rmCity" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#7aa2c8" stop-opacity=".22"/><stop offset="1" stop-color="#7aa2c8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rmVign" cx=".5" cy=".46" r=".72">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".68"/>
    </radialGradient>
    <filter id="rmBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="rmBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="rmGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer></filter>
  </defs>

  <polygon points="0,0 1600,0 1420,120 180,120" fill="#080b10"/>
  <rect x="180" y="120" width="1240" height="480" fill="url(#rmWall)"/>
  <polygon points="0,0 180,120 180,600 0,900" fill="#0a0d12"/>
  <polygon points="1600,0 1420,120 1420,600 1600,900" fill="#080b10"/>
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#rmFloor)"/>
  <rect x="180" y="586" width="1240" height="16" fill="#0b0f14" stroke="#33404f" stroke-width="2"/>

  <!-- wall panels -->
  <g stroke="#33404f" stroke-width="2" opacity=".5">
    <line x1="180" y1="320" x2="1420" y2="320"/><line x1="180" y1="460" x2="1420" y2="460"/>
    <line x1="560" y1="120" x2="560" y2="600"/><line x1="940" y1="120" x2="940" y2="600"/>
  </g>
  <rect x="196" y="136" width="1208" height="440" fill="none" stroke="#40516a" stroke-opacity=".45" stroke-width="2"/>

  <!-- carpet -->
  <polygon points="240,650 1350,650 1450,900 140,900" fill="#26303e" opacity=".75"/>
  <g stroke="#4a5f7a" stroke-opacity=".2" stroke-width="2">
    <line x1="300" y1="680" x2="1300" y2="680"/><line x1="260" y1="760" x2="1340" y2="760"/>
    <line x1="200" y1="850" x2="1400" y2="850"/>
  </g>

  <!-- window right -->
  <g>
    <rect x="1180" y="160" width="260" height="390" fill="#101a26" stroke="#33404f" stroke-width="8"/>
    <rect x="1194" y="174" width="232" height="362" fill="url(#rmNight)"/>
    <g fill="#ffcf86" opacity=".7">
      <rect x="1210" y="400" width="3" height="3"/><rect x="1240" y="420" width="3" height="3"/>
      <rect x="1280" y="380" width="3" height="3"/><rect x="1320" y="430" width="3" height="3"/>
      <rect x="1360" y="400" width="3" height="3"/><rect x="1390" y="450" width="3" height="3"/>
      <rect x="1230" y="300" width="3" height="3"/><rect x="1350" y="320" width="3" height="3"/>
    </g>
    <g opacity=".4" fill="#050a0e">
      <rect x="1200" y="440" width="30" height="60"/><rect x="1240" y="450" width="26" height="50"/>
      <rect x="1280" y="430" width="36" height="70"/><rect x="1330" y="445" width="28" height="55"/>
      <rect x="1370" y="420" width="36" height="80"/>
    </g>
    <line x1="1310" y1="174" x2="1310" y2="536" stroke="#33404f" stroke-width="6"/>
    <line x1="1194" y1="350" x2="1426" y2="350" stroke="#33404f" stroke-width="6"/>
    <ellipse cx="1310" cy="360" rx="170" ry="160" fill="url(#rmCity)"/>
    <!-- curtains -->
    <path d="M1140 150 q40 40 20 420 h-50 V150 z" fill="#202b3a" opacity=".9"/>
    <path d="M1450 150 q-40 40 -20 420 h50 V150 z" fill="#202b3a" opacity=".9"/>
  </g>

  <!-- bed -->
  <g>
    <rect x="220" y="330" width="580" height="70" fill="#2a2018" stroke="#4a3929" stroke-width="3"/>
    <rect x="240" y="380" width="540" height="170" rx="8" fill="#202a38" stroke="#33404f"/>
    <rect x="250" y="400" width="520" height="130" rx="6" fill="url(#rmBed)"/>
    <rect x="250" y="420" width="240" height="50" rx="16" fill="#f2eee7" opacity=".9"/>
    <rect x="520" y="420" width="250" height="50" rx="16" fill="#e7e1d4" opacity=".9"/>
    <rect x="250" y="510" width="520" height="40" rx="6" fill="#3b4556"/>
    <rect x="260" y="550" width="500" height="90" fill="#1a2430" opacity=".6"/>
    <ellipse cx="520" cy="640" rx="330" ry="40" fill="#000" opacity=".35" filter="url(#rmBlurS)"/>
    <!-- pillows -->
    <rect x="290" y="380" width="120" height="48" rx="18" fill="#f6f2ea"/>
    <rect x="430" y="382" width="120" height="46" rx="18" fill="#efe9df"/>
  </g>

  <!-- nightstand + phone -->
  <g>
    <rect x="880" y="480" width="230" height="120" rx="6" fill="url(#rmWood)" stroke="#241a12" stroke-width="3"/>
    <rect x="896" y="498" width="198" height="10" fill="#1e1711" opacity=".6"/>
    <rect x="960" y="500" width="90" height="52" rx="5" fill="#1b2430" stroke="#40516a"/>
    <rect x="970" y="508" width="70" height="30" rx="3" fill="#0a1620"/>
    <circle cx="1005" cy="524" r="4" fill="#5fe3b0" opacity=".6"/>
    <g transform="translate(1020,470)">
      <rect x="0" y="0" width="62" height="34" rx="6" fill="#1a222d" stroke="#40516a"/>
      <rect x="8" y="6" width="36" height="20" rx="3" fill="#0a1620"/>
      <circle cx="52" cy="17" r="3" fill="#c9a46a"/>
    </g>
    <!-- lamp -->
    <rect x="928" y="430" width="10" height="60" fill="#3a2b1e"/>
    <path d="M896 410 h74 l-14 28 h-46 z" fill="#3a3f49"/>
    <ellipse cx="932" cy="490" rx="150" ry="110" fill="url(#rmLamp)" opacity=".7"/>
  </g>

  <!-- suitcase on rack left -->
  <g>
    <rect x="260" y="530" width="300" height="20" rx="6" fill="#8a6a48"/>
    <rect x="280" y="550" width="12" height="110" fill="#5a4330"/><rect x="528" y="550" width="12" height="110" fill="#5a4330"/>
    <rect x="300" y="540" width="220" height="140" rx="12" fill="#2a303a" stroke="#4a5a6a" stroke-width="3"/>
    <rect x="316" y="556" width="188" height="108" rx="6" fill="#202630"/>
    <rect x="380" y="500" width="60" height="14" rx="6" fill="#3a4553"/>
    <circle cx="340" cy="680" r="7" fill="#0f151c"/><circle cx="480" cy="680" r="7" fill="#0f151c"/>
    <rect x="430" y="596" width="44" height="30" rx="4" fill="#b9924f" opacity=".5"/>
  </g>

  <!-- armchair near window -->
  <g transform="translate(1120,560)">
    <rect x="0" y="0" width="100" height="120" rx="16" fill="#2a3444" stroke="#40516a"/>
    <rect x="-14" y="40" width="24" height="80" rx="10" fill="#2a3444" stroke="#40516a"/>
    <rect x="90" y="40" width="24" height="80" rx="10" fill="#2a3444" stroke="#40516a"/>
    <rect x="10" y="96" width="80" height="20" rx="8" fill="#33435a"/>
    <rect x="6" y="116" width="12" height="30" fill="#1a222d"/><rect x="82" y="116" width="12" height="30" fill="#1a222d"/>
  </g>

  <!-- waste bin with receipt -->
  <g transform="translate(690,650)">
    <path d="M0 0 h100 l-10 100 h-80 z" fill="#1c2632" stroke="#33404f" stroke-width="3"/>
    <ellipse cx="50" cy="0" rx="50" ry="12" fill="#26323e" stroke="#40516a"/>
    <rect x="20" y="-18" width="60" height="36" rx="4" fill="#e9e3d4" transform="rotate(-12 50 0)"/>
    <line x1="28" y1="-4" x2="72" y2="-10" stroke="#b9ae98" stroke-width="2" transform="rotate(-12 50 0)"/>
  </g>

  <!-- desk + TV -->
  <g>
    <rect x="300" y="500" width="220" height="18" fill="url(#rmWood)" stroke="#241a12"/>
    <rect x="320" y="518" width="12" height="120" fill="#3a2b1e"/><rect x="488" y="518" width="12" height="120" fill="#3a2b1e"/>
    <rect x="320" y="360" width="180" height="100" rx="5" fill="#0b1118" stroke="#33404f" stroke-width="3"/>
    <rect x="332" y="372" width="156" height="76" fill="#0a1824"/>
    <rect x="370" y="460" width="80" height="10" rx="4" fill="#1a222d"/>
  </g>

  <!-- door left with hanger -->
  <g>
    <rect x="60" y="220" width="130" height="380" fill="#1a222d" stroke="#33404f" stroke-width="4"/>
    <rect x="78" y="240" width="94" height="340" fill="#111922"/>
    <circle cx="150" cy="420" r="7" fill="#c9a46a" opacity=".7"/>
    <g transform="translate(96,380)">
      <rect x="0" y="0" width="36" height="58" rx="3" fill="#e9e3d4" transform="rotate(-8 18 29)"/>
      <text x="18" y="18" text-anchor="middle" fill="#4a3d2c" font-size="6" font-family="Segoe UI" transform="rotate(-8 18 29)">NE PAS</text>
      <text x="18" y="28" text-anchor="middle" fill="#4a3d2c" font-size="6" font-family="Segoe UI" transform="rotate(-8 18 29)">DÉRANGER</text>
    </g>
  </g>

  <!-- ambient -->
  <ellipse cx="932" cy="520" rx="300" ry="200" fill="#ffcf86" opacity=".05" filter="url(#rmBlur)"/>
  <ellipse cx="1310" cy="380" rx="220" ry="220" fill="#7aa2c8" opacity=".04" filter="url(#rmBlur)"/>
  <rect width="1600" height="900" filter="url(#rmGrain)" opacity=".5"/>
  <rect width="1600" height="900" fill="url(#rmVign)"/>
  </svg>`;
}
