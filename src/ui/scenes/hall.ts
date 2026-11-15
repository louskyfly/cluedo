export function hallArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#35485f"/><stop offset=".55" stop-color="#233247"/><stop offset="1" stop-color="#151f2c"/>
    </linearGradient>
    <linearGradient id="hFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#53647a"/><stop offset=".45" stop-color="#303e51"/><stop offset="1" stop-color="#151d27"/>
    </linearGradient>
    <linearGradient id="hCeil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0e14"/><stop offset="1" stop-color="#151b25"/>
    </linearGradient>
    <linearGradient id="hWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a3b2c"/><stop offset=".4" stop-color="#352a1f"/><stop offset="1" stop-color="#211a13"/>
    </linearGradient>
    <linearGradient id="hWoodTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6a563f"/><stop offset="1" stop-color="#4b3c2c"/>
    </linearGradient>
    <linearGradient id="hGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#b9ddf5" stop-opacity=".4"/><stop offset=".45" stop-color="#77a6c7" stop-opacity=".13"/><stop offset="1" stop-color="#eaf7ff" stop-opacity=".04"/>
    </linearGradient>
    <linearGradient id="hSteel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5d6a7a"/><stop offset=".5" stop-color="#8794a4"/><stop offset="1" stop-color="#3d4856"/>
    </linearGradient>
    <linearGradient id="hLightCone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e8d6ad" stop-opacity=".2"/><stop offset="1" stop-color="#e8d6ad" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="hLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffd99a" stop-opacity=".6"/><stop offset=".35" stop-color="#ffcf86" stop-opacity=".22"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hGreen" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#4dffa6" stop-opacity=".5"/><stop offset="1" stop-color="#4dffa6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hVign" cx=".5" cy=".46" r=".74">
      <stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".68"/>
    </radialGradient>
    <filter id="hBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="hBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="hGrain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".09"/></feComponentTransfer>
    </filter>
  </defs>

  <!-- ceiling -->
  <polygon points="0,0 1600,0 1420,140 180,140" fill="url(#hCeil)"/>
  <g stroke="#2a3444" stroke-width="3" opacity=".8">
    <line x1="180" y1="60" x2="1420" y2="60"/>
    <line x1="180" y1="110" x2="1420" y2="110"/>
    <line x1="480" y1="0" x2="520" y2="140"/><line x1="800" y1="0" x2="800" y2="140"/><line x1="1120" y1="0" x2="1080" y2="140"/>
  </g>
  <g transform="translate(760,74)">
    <rect x="0" y="0" width="240" height="34" rx="4" fill="#0f1620" stroke="#33445a"/>
    <text x="120" y="22" text-anchor="middle" fill="#c9a46a" fill-opacity=".75" font-size="12" font-family="Segoe UI" letter-spacing="3">HALL PRINCIPAL</text>
  </g>
  <rect x="180" y="140" width="1240" height="460" fill="url(#hWall)"/>
  <!-- wall inset panels -->
  <rect x="214" y="174" width="1172" height="404" fill="none" stroke="#415870" stroke-opacity=".55" stroke-width="2"/>
  <rect x="226" y="186" width="1148" height="380" fill="rgba(255,255,255,.018)"/>
  <g stroke="#4b627a" stroke-opacity=".25" stroke-width="1">
    <line x1="226" y1="250" x2="1374" y2="250"/><line x1="226" y1="320" x2="1374" y2="320"/>
    <line x1="226" y1="390" x2="1374" y2="390"/><line x1="226" y1="460" x2="1374" y2="460"/>
  </g>
  <!-- baseboard -->
  <rect x="180" y="582" width="1240" height="18" fill="#0d1620" stroke="#3a4f66" stroke-width="2"/>

  <!-- side walls -->
  <polygon points="0,0 180,140 180,600 0,900" fill="#0a0f16"/>
  <polygon points="1600,0 1420,140 1420,600 1600,900" fill="#090e15"/>

  <!-- back wall panels -->
  <g stroke="#263040" stroke-width="1.5" fill="none">
    <line x1="180" y1="300" x2="1420" y2="300"/>
    <line x1="180" y1="460" x2="1420" y2="460"/>
    <line x1="500" y1="140" x2="500" y2="600"/>
    <line x1="1100" y1="140" x2="1100" y2="600"/>
  </g>
  <rect x="196" y="156" width="1208" height="428" fill="none" stroke="#2d3a4d" stroke-width="2"/>
  <rect x="204" y="164" width="1192" height="412" fill="none" stroke="#1c2634" stroke-width="1"/>

  <!-- wall signage and details -->
  <g transform="translate(930,170)">
    <path d="M0 40 L26 0 H74 L100 40 H74 L52 14 L30 40 Z" fill="#c9a46a" opacity=".55"/>
    <text x="50" y="78" text-anchor="middle" fill="#c9a46a" fill-opacity=".6" font-size="17" font-family="Georgia, serif" letter-spacing="9">HELIX</text>
    <line x1="0" y1="94" x2="100" y2="94" stroke="#c9a46a" stroke-opacity=".25"/>
  </g>
  <g transform="translate(220,300)">
    <rect x="0" y="0" width="150" height="112" fill="#d9d2c1" stroke="#6b5e4b" stroke-width="3"/>
    <rect x="10" y="10" width="130" height="18" fill="#8a2f2b" opacity=".8"/>
    <text x="75" y="24" text-anchor="middle" fill="#f2e7d8" font-size="9" font-family="Segoe UI" letter-spacing="1">ÉVACUATION</text>
    <g stroke="#8a8171" fill="none" stroke-width="2">
      <rect x="22" y="42" width="40" height="52"/><rect x="76" y="42" width="52" height="34"/>
      <path d="M42 94 v-28 h20 v28"/><path d="M108 62 h-14"/>
    </g>
    <text x="75" y="105" text-anchor="middle" fill="#6b5e4b" font-size="6" font-family="Segoe UI">NIVEAU 0 — HALL</text>
  </g>
  <g transform="translate(420,330)">
    <rect x="0" y="0" width="170" height="120" fill="#2a241c" stroke="#4a3c2c" stroke-width="3"/>
    <rect x="8" y="8" width="154" height="104" fill="#3a3126"/>
    <g fill="#d9d2c1" opacity=".8">
      <rect x="18" y="18" width="42" height="52" transform="rotate(-4 39 44)"/>
      <rect x="70" y="22" width="38" height="48" transform="rotate(3 89 46)"/>
      <rect x="116" y="18" width="38" height="50" transform="rotate(-2 135 43)"/>
      <rect x="26" y="80" width="54" height="24" transform="rotate(2 53 92)"/>
      <rect x="92" y="80" width="52" height="24" transform="rotate(-3 118 92)"/>
    </g>
    <g fill="#c9a46a" opacity=".55"><circle cx="39" cy="18" r="3"/><circle cx="89" cy="22" r="3"/><circle cx="135" cy="18" r="3"/></g>
  </g>
  <g transform="translate(700,470)">
    <rect x="0" y="0" width="34" height="86" rx="10" fill="#8a2f2b" stroke="#5a1e1a" stroke-width="2"/>
    <rect x="8" y="-10" width="18" height="14" rx="4" fill="#2a2a2a"/>
    <rect x="12" y="30" width="10" height="28" rx="4" fill="#e6d7c4" opacity=".7"/>
  </g>
  <g transform="translate(1210,250)">
    <circle cx="0" cy="0" r="30" fill="#1a2331" stroke="#3a4a5e" stroke-width="3"/>
    <circle cx="0" cy="0" r="24" fill="#0e151e"/>
    <g stroke="#c9a46a" stroke-width="2"><line x1="0" y1="0" x2="0" y2="-16"/><line x1="0" y1="0" x2="10" y2="4"/></g>
    <circle cx="0" cy="0" r="2" fill="#c9a46a"/>
  </g>

  <!-- floor -->
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#hFloor)"/>
  <g stroke="#5b6a7c" stroke-opacity=".14" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="500"/><line x1="200" y1="900" x2="800" y2="500"/>
    <line x1="400" y1="900" x2="800" y2="500"/><line x1="600" y1="900" x2="800" y2="500"/>
    <line x1="800" y1="900" x2="800" y2="500"/><line x1="1000" y1="900" x2="800" y2="500"/>
    <line x1="1200" y1="900" x2="800" y2="500"/><line x1="1400" y1="900" x2="800" y2="500"/>
    <line x1="1600" y1="900" x2="800" y2="500"/>
  </g>
  <g stroke="#5b6a7c" stroke-opacity=".1" stroke-width="2">
    <line x1="146" y1="620" x2="1454" y2="620"/><line x1="112" y1="650" x2="1488" y2="650"/>
    <line x1="72" y1="690" x2="1528" y2="690"/><line x1="26" y1="745" x2="1574" y2="745"/>
    <line x1="0" y1="820" x2="1600" y2="820"/>
  </g>
  <!-- floor sheen -->
  <ellipse cx="800" cy="760" rx="620" ry="110" fill="#7aa2c8" opacity=".05" filter="url(#hBlur)"/>

  <!-- glass entrance on left wall -->
  <polygon points="28,210 166,262 166,566 28,738" fill="#0b131d" stroke="#3a4a5e" stroke-width="3"/>
  <polygon points="38,222 156,268 156,552 38,714" fill="url(#hGlass)"/>
  <g opacity=".35">
    <polygon points="38,222 156,268 156,380 38,430" fill="#9fc7e8" opacity=".25"/>
    <g stroke="#0a0f16" stroke-width="10" opacity=".5"><line x1="96" y1="240" x2="96" y2="640"/><line x1="38" y1="470" x2="156" y2="410"/></g>
    <path d="M40 520 q30 -18 56 0 q-28 12 -56 0" fill="#0a0f16" opacity=".35"/>
  </g>
  <g transform="translate(48,470)">
    <rect x="0" y="0" width="8" height="70" rx="4" fill="#8fa3b2" opacity=".7"/>
    <rect x="24" y="0" width="8" height="70" rx="4" fill="#8fa3b2" opacity=".7"/>
  </g>
  <!-- exterior silhouettes -->
  <g opacity=".25" fill="#05080c">
    <path d="M38 300 h26 v-70 h18 v70 h20 v-40 h22 v40 h30 v-100 h20 v100 h16 v-60 h20 v60 z" transform="translate(0,180)"/>
    <path d="M60 520 h20 v-60 h18 v60 h18 v-40 h20 v40 h18 v-80 h16 v80 z" transform="translate(0,80)"/>
  </g>
  <line x1="96" y1="245" x2="96" y2="632" stroke="#3a4a5e" stroke-width="3"/>
  <line x1="38" y1="470" x2="156" y2="410" stroke="#3a4a5e" stroke-width="3"/>
  <g stroke="#bcd9ef" stroke-opacity=".28" stroke-width="1.4">
    <line x1="52" y1="250" x2="42" y2="300"/><line x1="78" y1="262" x2="60" y2="360"/>
    <line x1="112" y1="278" x2="92" y2="390"/><line x1="140" y1="290" x2="122" y2="376"/>
    <line x1="60" y1="410" x2="48" y2="480"/><line x1="104" y1="430" x2="86" y2="530"/>
    <line x1="136" y1="446" x2="118" y2="540"/>
  </g>
  <text x="96" y="330" fill="#cfe5f5" fill-opacity=".55" font-size="15" font-family="Segoe UI" letter-spacing="6" transform="rotate(21 96 330)">HELIX</text>
  <rect x="30" y="740" width="140" height="16" rx="4" fill="#252017" opacity=".8"/>

  <!-- corridor door -->
  <rect x="780" y="230" width="220" height="370" rx="4" fill="#101722" stroke="#2c3b50" stroke-width="3"/>
  <rect x="794" y="244" width="192" height="342" rx="2" fill="#0a111b"/>
  <rect x="812" y="262" width="156" height="240" fill="#0b1624" stroke="#20324a" stroke-width="1"/>
  <text x="890" y="386" text-anchor="middle" fill="#86b3d1" font-size="17" font-family="Segoe UI" letter-spacing="2">ACCÈS</text>
  <text x="890" y="410" text-anchor="middle" fill="#86b3d1" font-size="17" font-family="Segoe UI" letter-spacing="2">LABORATOIRES</text>
  <rect x="892" y="492" width="14" height="26" rx="3" fill="#c9b07a"/>
  <rect x="1006" y="470" width="26" height="52" rx="4" fill="#26313f" stroke="#4a5b70"/>
  <circle cx="1019" cy="488" r="4" fill="#39d98a"/>
  <rect x="1014" y="500" width="10" height="12" fill="#0b1118"/>

  <!-- waiting bench foreground left -->
  <g opacity=".9">
    <rect x="20" y="690" width="220" height="26" rx="8" fill="#26313f" stroke="#40546a"/>
    <rect x="36" y="716" width="14" height="90" fill="#1a222e"/>
    <rect x="210" y="716" width="14" height="90" fill="#1a222e"/>
    <rect x="34" y="660" width="192" height="16" rx="5" fill="#2f3c4c"/>
    <rect x="48" y="676" width="8" height="18" fill="#1a222e"/><rect x="204" y="676" width="8" height="18" fill="#1a222e"/>
  </g>
  <!-- wet floor sign -->
  <g transform="translate(540,690)">
    <polygon points="20,0 46,0 66,80 0,80" fill="#d9b64e" stroke="#8a6f22" stroke-width="2"/>
    <text x="33" y="34" text-anchor="middle" fill="#3a2c08" font-size="10" font-family="Segoe UI" font-weight="700">SOL</text>
    <text x="33" y="48" text-anchor="middle" fill="#3a2c08" font-size="10" font-family="Segoe UI" font-weight="700">GLISSANT</text>
    <path d="M18 62 q16 -10 30 0" fill="none" stroke="#3a2c08" stroke-width="2"/>
  </g>
  <!-- security kiosk -->
  <g transform="translate(600,470)">
    <rect x="0" y="0" width="62" height="150" rx="4" fill="#202a38" stroke="#3d5268" stroke-width="2"/>
    <rect x="8" y="12" width="46" height="48" rx="2" fill="#0b1620"/>
    <g fill="#39d98a" opacity=".6"><rect x="14" y="20" width="34" height="3"/><rect x="14" y="28" width="26" height="3"/><rect x="14" y="36" width="30" height="3"/></g>
    <text x="31" y="84" text-anchor="middle" fill="#9fc7e8" font-size="8" font-family="Segoe UI" letter-spacing="1">BADGEZ</text>
    <text x="31" y="96" text-anchor="middle" fill="#9fc7e8" font-size="8" font-family="Segoe UI" letter-spacing="1">VOTRE ACCÈS</text>
    <circle cx="31" cy="116" r="6" fill="#39d98a" opacity=".7"/>
  </g>
  <!-- exit sign -->
  <g transform="translate(60,250)">
    <rect x="0" y="0" width="96" height="30" rx="4" fill="#0e2a1e" stroke="#2f7a52" stroke-width="2"/>
    <text x="48" y="20" text-anchor="middle" fill="#6fe3a8" font-size="12" font-family="Segoe UI" letter-spacing="3">SORTIE</text>
  </g>
  <!-- console table with mail -->
  <polygon points="556,492 792,492 826,548 528,548" fill="url(#hWoodTop)" stroke="#241b12" stroke-width="2"/>
  <rect x="536" y="548" width="278" height="18" fill="#2a2016"/>
  <rect x="556" y="566" width="14" height="130" fill="#21180f"/><rect x="780" y="566" width="14" height="130" fill="#21180f"/>
  <rect x="650" y="500" width="128" height="66" rx="2" fill="#e7deca" transform="rotate(-7 714 533)"/>
  <line x1="652" y1="516" x2="770" y2="500" stroke="#bfae8f" stroke-width="2" transform="rotate(-7 714 533)"/>
  <rect x="690" y="518" width="58" height="8" rx="2" fill="#b9a98a" transform="rotate(-7 714 533)" opacity=".7"/>

  <!-- security counter -->
  <polygon points="940,480 1508,480 1580,568 892,568" fill="url(#hWoodTop)" stroke="#241b12" stroke-width="2"/>
  <polygon points="892,568 1580,568 1560,700 864,700" fill="url(#hWood)" stroke="#1d150e"/>
  <g stroke="#1b140e" stroke-width="2" opacity=".6">
    <line x1="972" y1="574" x2="950" y2="694"/><line x1="1150" y1="574" x2="1140" y2="696"/>
    <line x1="1330" y1="574" x2="1350" y2="696"/>
  </g>
  <rect x="886" y="560" width="702" height="14" rx="4" fill="#6e5a42" opacity=".6"/>
  <!-- monitor -->
  <rect x="1190" y="348" width="250" height="150" rx="6" fill="#121822" stroke="#3a4658" stroke-width="3"/>
  <rect x="1204" y="362" width="222" height="116" rx="3" fill="#071620"/>
  <g fill="#5fe3b0" opacity=".8" font-family="Consolas, monospace" font-size="11">
    <text x="1216" y="386">19:02  EVASSEUR  IN</text><text x="1216" y="404">20:15  LMOREL    IN</text>
    <text x="1216" y="422">21:40  SKADER    IN</text><text x="1216" y="440">22:05  SKADER    OUT</text>
    <text x="1216" y="458">23:12  LOCK INTERNAL</text>
  </g>
  <rect x="1302" y="498" width="36" height="58" fill="#1a212c"/>
  <rect x="1268" y="556" width="104" height="12" rx="4" fill="#1a212c"/>
  <!-- badge reader -->
  <rect x="1024" y="420" width="96" height="126" rx="8" fill="url(#hSteel)" stroke="#2f3945" stroke-width="2"/>
  <rect x="1040" y="438" width="64" height="76" rx="4" fill="#101923"/>
  <circle cx="1072" cy="476" r="9" fill="#39d98a"/>
  <rect x="1052" y="500" width="40" height="6" rx="3" fill="#243044"/>
  <rect x="1044" y="524" width="56" height="9" rx="4" fill="#2a3442"/>
  <ellipse cx="1072" cy="490" rx="58" ry="40" fill="url(#hGreen)" opacity=".55"/>
  <!-- desk lamp -->
  <rect x="934" y="486" width="8" height="44" fill="#2a303a"/>
  <circle cx="938" cy="486" r="7" fill="#3a4250"/>
  <path d="M906 462 h64 l-12 28 h-40 z" fill="#3a3f49" stroke="#242a33"/>
  <ellipse cx="938" cy="462" rx="34" ry="7" fill="#5a5f68" opacity=".5"/>
  <ellipse cx="938" cy="500" rx="150" ry="80" fill="url(#hLamp)" opacity=".8"/>
  <!-- desk details -->
  <g>
    <rect x="1110" y="590" width="152" height="48" rx="4" fill="#1a2029" opacity=".8"/>
    <g fill="#3f4a59"><rect x="1122" y="600" width="18" height="8" rx="2"/><rect x="1144" y="600" width="18" height="8" rx="2"/><rect x="1166" y="600" width="18" height="8" rx="2"/><rect x="1188" y="600" width="18" height="8" rx="2"/><rect x="1210" y="600" width="18" height="8" rx="2"/><rect x="1232" y="600" width="18" height="8" rx="2"/></g>
    <rect x="1126" y="614" width="120" height="6" rx="3" fill="#3f4a59"/>
    <rect x="780" y="572" width="36" height="16" rx="3" fill="#1a2029" stroke="#3a4658"/>
    <g transform="translate(1340,560)">
      <rect x="0" y="4" width="26" height="34" rx="4" fill="#1c2430" stroke="#3a4658"/>
      <rect x="4" y="8" width="18" height="14" rx="2" fill="#0a1620"/>
      <circle cx="13" cy="30" r="2" fill="#39d98a"/>
    </g>
    <g transform="translate(1460,530)">
      <ellipse cx="0" cy="0" rx="18" ry="6" fill="#2a3038"/>
      <rect x="-14" y="-4" width="28" height="26" rx="5" fill="#2a3038"/>
      <path d="M14 2 q12 4 8 14 q-4 8 -12 4" fill="none" stroke="#2a3038" stroke-width="5"/>
      <ellipse cx="0" cy="-4" rx="13" ry="4" fill="#4a3826"/>
    </g>
    <path d="M1200 556 q20 26 54 26" fill="none" stroke="#10151d" stroke-width="3" opacity=".8"/>
    <rect x="1000" y="558" width="220" height="6" rx="3" fill="#1b232f" opacity=".8"/>
  </g>
  <!-- security chair -->
  <g opacity=".9">
    <rect x="1430" y="410" width="70" height="100" rx="12" fill="#1c2431" stroke="#333e4f"/>
    <rect x="1452" y="510" width="12" height="110" fill="#222b38"/>
    <rect x="1408" y="616" width="100" height="10" rx="5" fill="#222b38"/>
  </g>
  <!-- desk front sign -->
  <g transform="translate(1090,636)">
    <rect x="0" y="0" width="160" height="30" rx="3" fill="#101720" stroke="#3a4658" opacity=".9"/>
    <text x="80" y="20" text-anchor="middle" fill="#9fc7e8" font-size="11" font-family="Segoe UI" letter-spacing="4">SÉCURITÉ</text>
  </g>

  <!-- umbrella stand -->
  <rect x="300" y="520" width="120" height="190" rx="10" fill="#202a37" stroke="#3c4a5c" stroke-width="3"/>
  <ellipse cx="360" cy="520" rx="60" ry="12" fill="#2c3848" stroke="#45566a"/>
  <line x1="344" y1="360" x2="356" y2="540" stroke="#1b1b1b" stroke-width="7" stroke-linecap="round"/>
  <path d="M268 380 Q356 322 444 380" fill="#151515" stroke="#0a0a0a" stroke-width="4"/>
  <path d="M268 380 Q356 346 444 380" fill="#1d1d1d"/>
  <path d="M300 380 v-20 M330 370 v-26 M360 367 v-30 M390 370 v-26 M420 380 v-20" stroke="#2a2a2a" stroke-width="2"/>
  <ellipse cx="360" cy="712" rx="86" ry="16" fill="#0a0f16" filter="url(#hBlurS)" opacity=".7"/>
  <ellipse cx="356" cy="704" rx="70" ry="10" fill="#3f6d8a" opacity=".22"/>
  <!-- wet footprints -->
  <g fill="#6f9ab8" opacity=".16">
    <ellipse cx="470" cy="780" rx="16" ry="7" transform="rotate(-12 470 780)"/>
    <ellipse cx="512" cy="752" rx="15" ry="6" transform="rotate(-12 512 752)"/>
    <ellipse cx="552" cy="722" rx="14" ry="6" transform="rotate(-12 552 722)"/>
    <ellipse cx="596" cy="696" rx="12" ry="5" transform="rotate(-12 596 696)"/>
  </g>
  <!-- potted plant -->
  <g>
    <rect x="174" y="548" width="70" height="88" rx="8" fill="#1e2937" stroke="#334254"/>
    <g stroke="#2f5f4a" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M210 548 q-22 -46 -44 -62"/><path d="M210 548 q16 -58 40 -78"/><path d="M208 548 q-4 -40 10 -74"/>
      <path d="M196 504 q-18 4 -28 -6"/><path d="M228 492 q16 2 26 -8"/>
    </g>
  </g>

  <!-- camera top right -->
  <g transform="translate(1308,208)">
    <rect x="-8" y="-24" width="16" height="42" fill="#2b3443"/>
    <rect x="-46" y="10" width="92" height="38" rx="8" fill="#333e4d" stroke="#18212c" stroke-width="2"/>
    <circle cx="0" cy="29" r="13" fill="#0a1018" stroke="#6d8096" stroke-width="2"/>
    <circle cx="0" cy="29" r="5" fill="#2b3b4d"/>
    <circle cx="30" cy="18" r="4" fill="#d9534f"/>
    <path d="M-38 48 l-20 58 l78 0 l-20 -58" fill="#7aa2c8" opacity=".05"/>
  </g>

  <!-- ceiling lights -->
  <g>
    <rect x="360" y="54" width="120" height="8" rx="4" fill="#2a303a"/>
    <rect x="760" y="54" width="120" height="8" rx="4" fill="#2a303a"/>
    <rect x="1160" y="54" width="120" height="8" rx="4" fill="#2a303a"/>
    <polygon points="360,62 480,62 570,600 270,600" fill="url(#hLightCone)" opacity=".55"/>
    <polygon points="760,62 880,62 970,600 670,600" fill="url(#hLightCone)" opacity=".4"/>
    <polygon points="1160,62 1280,62 1370,600 1070,600" fill="url(#hLightCone)" opacity=".45"/>
  </g>

  <!-- floor runner -->
  <polygon points="540,660 1040,660 1120,900 430,900" fill="#1c2735" opacity=".55"/>
  <polygon points="560,672 1020,672 1090,888 460,888" fill="none" stroke="#c9a46a" stroke-opacity=".12" stroke-width="2"/>
  <!-- floor reflections -->
  <g opacity=".18" filter="url(#hBlurS)">
    <rect x="1010" y="700" width="18" height="130" fill="#ffcf86"/>
    <rect x="1170" y="690" width="10" height="110" fill="#9fc7e8"/>
    <rect x="760" y="640" width="80" height="7" fill="#9fc7e8"/>
    <rect x="300" y="650" width="100" height="8" fill="#7aa2c8"/>
  </g>
  <!-- foreground depth haze -->
  <ellipse cx="800" cy="860" rx="700" ry="90" fill="#05080c" opacity=".55" filter="url(#hBlur)"/>
  <!-- ambient glows -->
  <ellipse cx="360" cy="680" rx="230" ry="130" fill="#7aa2c8" opacity=".06" filter="url(#hBlur)"/>
  <ellipse cx="1200" cy="520" rx="320" ry="200" fill="#ffcf86" opacity=".09" filter="url(#hBlur)"/>
  <ellipse cx="960" cy="540" rx="260" ry="120" fill="#ffcf86" opacity=".06" filter="url(#hBlur)"/>

  <!-- grain + vignette -->
  <rect width="1600" height="900" filter="url(#hGrain)" opacity=".34"/>
  <rect width="1600" height="900" fill="url(#hVign)" opacity=".72"/>
  </svg>`;
}
