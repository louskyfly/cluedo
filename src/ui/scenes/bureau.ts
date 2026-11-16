export function bureauArt() {
  return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a2119"/><stop offset=".55" stop-color="#1e1712"/><stop offset="1" stop-color="#140f0c"/>
    </linearGradient>
    <linearGradient id="bFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3b2d21"/><stop offset=".45" stop-color="#2a2018"/><stop offset="1" stop-color="#16100c"/>
    </linearGradient>
    <linearGradient id="bWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6b5238"/><stop offset=".5" stop-color="#4b3826"/><stop offset="1" stop-color="#2f2218"/>
    </linearGradient>
    <linearGradient id="bDeskTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8a6a48"/><stop offset=".4" stop-color="#6e5237"/><stop offset="1" stop-color="#4d3926"/>
    </linearGradient>
    <linearGradient id="bScreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#173447"/><stop offset="1" stop-color="#0a1822"/>
    </linearGradient>
    <linearGradient id="bNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b1a2a"/><stop offset=".55" stop-color="#102a40"/><stop offset="1" stop-color="#07111a"/>
    </linearGradient>
    <linearGradient id="bMoon" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9fc8e8" stop-opacity=".22"/><stop offset="1" stop-color="#9fc8e8" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="bLamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffcf86" stop-opacity=".6"/><stop offset=".4" stop-color="#ffcf86" stop-opacity=".2"/><stop offset="1" stop-color="#ffcf86" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bVign" cx=".5" cy=".48" r=".75">
      <stop offset=".48" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".66"/>
    </radialGradient>
    <filter id="bBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="bBlurS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter id="bGrain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer></filter>
    <pattern id="bMesh" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#5b7088" opacity=".55"/></pattern>
  </defs>

  <!-- ceiling -->
  <polygon points="0,0 1600,0 1420,140 180,140" fill="#0d0a08"/>
  <rect x="180" y="140" width="1240" height="460" fill="url(#bWall)"/>
  <!-- side walls -->
  <polygon points="0,0 180,140 180,600 0,900" fill="#100c09"/>
  <polygon points="1600,0 1420,140 1420,600 1600,900" fill="#0c0907"/>
  <!-- wainscoting -->
  <rect x="180" y="430" width="1240" height="170" fill="#241b13" stroke="#3a2b1e" stroke-width="2"/>
  <g stroke="#33241a" stroke-width="2" opacity=".7">
    <line x1="320" y1="440" x2="320" y2="590"/><line x1="520" y1="440" x2="520" y2="590"/>
    <line x1="720" y1="440" x2="720" y2="590"/><line x1="920" y1="440" x2="920" y2="590"/>
    <line x1="1120" y1="440" x2="1120" y2="590"/><line x1="1320" y1="440" x2="1320" y2="590"/>
  </g>
  <!-- floor -->
  <polygon points="0,900 180,600 1420,600 1600,900" fill="url(#bFloor)"/>
  <g stroke="#8a6a48" stroke-opacity=".12" stroke-width="2">
    <line x1="0" y1="900" x2="800" y2="520"/><line x1="200" y1="900" x2="800" y2="520"/>
    <line x1="400" y1="900" x2="800" y2="520"/><line x1="600" y1="900" x2="800" y2="520"/>
    <line x1="800" y1="900" x2="800" y2="520"/><line x1="1000" y1="900" x2="800" y2="520"/>
    <line x1="1200" y1="900" x2="800" y2="520"/><line x1="1400" y1="900" x2="800" y2="520"/>
    <line x1="1600" y1="900" x2="800" y2="520"/>
  </g>
  <g stroke="#8a6a48" stroke-opacity=".08" stroke-width="2">
    <line x1="120" y1="640" x2="1480" y2="640"/><line x1="80" y1="690" x2="1520" y2="690"/>
    <line x1="30" y1="760" x2="1570" y2="760"/><line x1="0" y1="845" x2="1600" y2="845"/>
  </g>
  <!-- rug -->
  <polygon points="430,660 1170,660 1310,830 300,830" fill="#3a2a22" opacity=".8"/>
  <polygon points="470,672 1130,672 1250,812 360,812" fill="none" stroke="#6b4a36" stroke-width="3" opacity=".5"/>

  <!-- window right -->
  <rect x="1130" y="160" width="290" height="380" rx="4" fill="#1a2534" stroke="#3a2b1e" stroke-width="8"/>
  <rect x="1144" y="174" width="262" height="352" fill="url(#bNight)"/>
  <g stroke="#7aa2c8" stroke-opacity=".22" stroke-width="1.5">
    <line x1="1160" y1="190" x2="1148" y2="250"/><line x1="1190" y1="180" x2="1176" y2="270"/>
    <line x1="1230" y1="200" x2="1214" y2="310"/><line x1="1270" y1="188" x2="1252" y2="300"/>
    <line x1="1310" y1="210" x2="1292" y2="330"/><line x1="1350" y1="196" x2="1332" y2="320"/>
    <line x1="1388" y1="220" x2="1370" y2="340"/>
  </g>
  <line x1="1275" y1="174" x2="1275" y2="526" stroke="#3a2b1e" stroke-width="6"/>
  <line x1="1144" y1="350" x2="1406" y2="350" stroke="#3a2b1e" stroke-width="6"/>
  <!-- blinds -->
  <g stroke="#4a3a2a" stroke-width="3" opacity=".85">
    <line x1="1144" y1="196" x2="1406" y2="196"/><line x1="1144" y1="220" x2="1406" y2="220"/>
    <line x1="1144" y1="244" x2="1406" y2="244"/><line x1="1144" y1="268" x2="1406" y2="268"/>
    <line x1="1144" y1="292" x2="1406" y2="292"/><line x1="1144" y1="316" x2="1406" y2="316"/>
  </g>
  <polygon points="1144,174 1406,174 1300,600 1050,600" fill="url(#bMoon)" opacity=".55"/>

  <!-- calendar on wall -->
  <g transform="translate(300,196)">
    <rect x="0" y="0" width="196" height="216" fill="#e9e4d6" stroke="#b9b09c" stroke-width="2"/>
    <rect x="0" y="0" width="196" height="42" fill="#8a2f2b"/>
    <text x="98" y="28" text-anchor="middle" fill="#f4e9dd" font-size="17" font-family="Georgia, serif" letter-spacing="2">OCTOBRE</text>
    <g fill="#3a352c" font-size="14" font-family="Segoe UI">
      <text x="30" y="76">L</text><text x="64" y="76">M</text><text x="98" y="76">M</text><text x="132" y="76">J</text><text x="166" y="76">V</text>
      <text x="30" y="110">6</text><text x="64" y="110">7</text><text x="98" y="110">8</text><text x="132" y="110">9</text><text x="166" y="110">10</text>
      <text x="30" y="144">13</text><text x="64" y="144">14</text><text x="98" y="144">15</text><text x="132" y="144">16</text><text x="166" y="144">17</text>
      <text x="30" y="178">20</text><text x="64" y="178">21</text><text x="98" y="178">22</text><text x="132" y="178">23</text><text x="166" y="178">24</text>
    </g>
    <circle cx="36" cy="139" r="18" fill="none" stroke="#b23b35" stroke-width="3"/>
    <text x="98" y="206" text-anchor="middle" fill="#8a2f2b" font-size="11" font-family="Segoe UI" font-style="italic">Livraison N. — 07:00</text>
    <rect x="88" y="-8" width="20" height="14" fill="#777" opacity=".7"/>
  </g>

  <!-- framed photo -->
  <g transform="translate(512,360)">
    <rect x="0" y="0" width="128" height="158" fill="#2e241a" stroke="#7a5f42" stroke-width="5"/>
    <rect x="11" y="11" width="106" height="120" fill="#1a2534"/>
    <circle cx="42" cy="52" r="14" fill="#829ab1"/>
    <circle cx="86" cy="58" r="14" fill="#9db1c4"/>
    <rect x="28" y="74" width="72" height="34" rx="6" fill="#2c3b4f"/>
    <text x="64" y="148" text-anchor="middle" fill="#c9b07a" font-size="8" font-family="Segoe UI" letter-spacing="1">ÉQUIPE HELIX</text>
  </g>

  <!-- diploma -->
  <g transform="translate(720,208)">
    <rect x="0" y="0" width="150" height="104" fill="#2a2119" stroke="#7a5f42" stroke-width="4"/>
    <rect x="10" y="10" width="130" height="84" fill="#e8e0cf"/>
    <text x="75" y="32" text-anchor="middle" fill="#5a4a38" font-size="9" font-family="Georgia, serif" letter-spacing="2">UNIVERSITÉ</text>
    <text x="75" y="48" text-anchor="middle" fill="#7a6a55" font-size="7" font-family="Segoe UI">NEUROCHIMIE</text>
    <line x1="30" y1="62" x2="120" y2="62" stroke="#c9a46a" stroke-width="1"/>
    <text x="75" y="78" text-anchor="middle" fill="#8a7a65" font-size="6" font-family="Segoe UI">ÉMILE VASSEUR</text>
  </g>
  <!-- low cabinet with safe -->
  <g>
    <rect x="1180" y="500" width="220" height="160" fill="#2a2018" stroke="#3a2b1e" stroke-width="3"/>
    <rect x="1196" y="516" width="188" height="128" fill="#241b13" stroke="#1a130d"/>
    <rect x="1210" y="530" width="80" height="100" fill="#18110c" stroke="#3a2b1e"/>
    <circle cx="1280" cy="580" r="7" fill="#c9a46a" opacity=".5"/>
    <rect x="1310" y="536" width="58" height="88" fill="#1b140e" stroke="#3a2b1e"/>
    <circle cx="1339" cy="570" r="10" fill="#0d0906" stroke="#6b5238"/>
    <line x1="1339" y1="560" x2="1339" y2="580" stroke="#8a6a48" stroke-width="2"/>
  </g>
  <!-- plant corner -->
  <g transform="translate(140,520)">
    <rect x="0" y="0" width="66" height="90" rx="8" fill="#1e2937" stroke="#334254"/>
    <g stroke="#2f5f4a" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M33 0 q-30 -40 -56 -52"/><path d="M33 0 q6 -56 30 -74"/><path d="M33 0 q-4 -34 16 -60"/>
      <path d="M18 -36 q-16 6 -26 -4"/><path d="M46 -48 q14 4 24 -6"/>
    </g>
    <ellipse cx="33" cy="92" rx="50" ry="10" fill="#000" opacity=".3" filter="url(#bBlurS)"/>
  </g>
  <!-- window city glow -->
  <g opacity=".8">
    <circle cx="1270" cy="300" r="120" fill="#7aa2c8" opacity=".08" filter="url(#bBlur)"/>
    <g fill="#ffcf86">
      <rect x="1168" y="470" width="4" height="4"/><rect x="1200" y="490" width="3" height="3"/>
      <rect x="1240" y="460" width="4" height="4"/><rect x="1290" y="500" width="3" height="3"/>
      <rect x="1330" y="470" width="4" height="4"/><rect x="1370" y="495" width="3" height="3"/>
      <rect x="1180" y="420" width="3" height="3"/><rect x="1340" y="420" width="3" height="3"/>
    </g>
    <g opacity=".25" fill="#0a1119">
      <rect x="1150" y="500" width="30" height="40"/><rect x="1190" y="510" width="24" height="30"/>
      <rect x="1230" y="495" width="36" height="45"/><rect x="1280" y="505" width="26" height="35"/>
      <rect x="1320" y="490" width="30" height="50"/><rect x="1360" y="515" width="30" height="25"/>
    </g>
  </g>
  <!-- bookshelf right -->
  <rect x="1450" y="240" width="120" height="360" fill="#2a2018" stroke="#3a2b1e" stroke-width="3"/>
  <g fill="#4a3826">
    <rect x="1462" y="260" width="96" height="80"/><rect x="1462" y="360" width="96" height="80"/>
    <rect x="1462" y="460" width="96" height="80"/>
  </g>
  <g fill="#7a5f42" opacity=".7">
    <rect x="1470" y="272" width="12" height="56"/><rect x="1488" y="278" width="10" height="50"/><rect x="1504" y="268" width="16" height="60"/><rect x="1524" y="276" width="12" height="52"/>
    <rect x="1470" y="372" width="16" height="56"/><rect x="1492" y="366" width="10" height="62"/><rect x="1508" y="374" width="14" height="54"/>
    <rect x="1474" y="474" width="12" height="54"/><rect x="1492" y="468" width="18" height="60"/>
  </g>

  <!-- desk -->
  <polygon points="330,520 1180,520 1240,568 270,568" fill="url(#bDeskTop)" stroke="#3a2b1e" stroke-width="2"/>
  <rect x="270" y="568" width="970" height="26" fill="#3a2b1e"/>
  <rect x="310" y="594" width="40" height="210" fill="#2a2018"/><rect x="1120" y="594" width="40" height="210" fill="#2a2018"/>
  <!-- drawer unit -->
  <rect x="960" y="594" width="210" height="200" fill="#3a2b1e" stroke="#241b13" stroke-width="2"/>
  <rect x="976" y="606" width="178" height="52" fill="#2f2318" stroke="#1e160f"/>
  <rect x="976" y="666" width="178" height="52" fill="#2f2318" stroke="#1e160f"/>
  <rect x="976" y="726" width="178" height="56" fill="#1b140e" stroke="#c9a46a" stroke-opacity=".35" stroke-width="2"/>
  <rect x="996" y="736" width="138" height="36" fill="#0b0805" opacity=".8"/>
  <rect x="1046" y="614" width="38" height="6" rx="3" fill="#8a6a48"/>
  <rect x="1046" y="674" width="38" height="6" rx="3" fill="#8a6a48"/>
  <rect x="1046" y="744" width="38" height="6" rx="3" fill="#8a6a48" opacity=".5"/>

  <!-- laptop -->
  <g>
    <rect x="680" y="352" width="248" height="158" rx="7" fill="#1a2029" stroke="#46536a" stroke-width="3"/>
    <rect x="692" y="364" width="224" height="134" rx="3" fill="url(#bScreen)"/>
    <g fill="#6fd4c8" opacity=".55" font-family="Consolas, monospace" font-size="9">
      <text x="704" y="386">PROJET NÉMÉSIS / NX-17</text>
      <text x="704" y="404">analyse_en_cours.log</text>
      <text x="704" y="422">sujet: échantillon 17</text>
      <text x="704" y="440">statut: stable</text>
    </g>
    <rect x="706" y="462" width="190" height="26" fill="#0a141c" opacity=".7"/>
    <polygon points="650,510 958,510 986,540 622,540" fill="#2b3442" stroke="#111923" stroke-width="2"/>
    <rect x="680" y="530" width="230" height="8" rx="4" fill="#0e141c"/>
    <ellipse cx="804" cy="552" rx="190" ry="16" fill="#000" opacity=".25" filter="url(#bBlurS)"/>
  </g>

  <!-- post-it note -->
  <g transform="translate(946,470) rotate(6)">
    <rect x="0" y="0" width="76" height="66" fill="#f0d36a" stroke="#c9a94e"/>
    <g fill="#5a4a10" font-size="10" font-family="Segoe UI">
      <text x="8" y="20">Sauvegarde</text><text x="8" y="34">coffre</text><text x="8" y="48">23h</text>
    </g>
  </g>

  <!-- desk lamp -->
  <g>
    <ellipse cx="480" cy="500" rx="16" ry="7" fill="#2a2018"/>
    <rect x="476" y="420" width="8" height="82" fill="#2f2a24"/>
    <path d="M438 402 h82 l-16 36 h-50 z" fill="#3a3f49" stroke="#242a33"/>
    <ellipse cx="480" cy="402" rx="41" ry="8" fill="#5a5f68" opacity=".5"/>
    <ellipse cx="520" cy="520" rx="210" ry="150" fill="url(#bLamp)" opacity=".9"/>
  </g>

  <!-- papers, mug, pen -->
  <g>
    <rect x="560" y="532" width="100" height="26" fill="#e8e0cf" transform="rotate(-4 610 545)"/>
    <rect x="576" y="528" width="100" height="26" fill="#f1eadb" transform="rotate(3 626 541)"/>
    <rect x="590" y="524" width="100" height="26" fill="#e8e0cf" transform="rotate(-1 640 537)"/>
    <g stroke="#b8b0a0" stroke-width="1"><line x1="600" y1="532" x2="670" y2="531"/><line x1="602" y1="540" x2="662" y2="539"/></g>
    <rect x="860" y="486" width="40" height="40" rx="6" fill="#2a3038"/>
    <path d="M900 496 q22 0 22 14 q0 14 -22 14" fill="none" stroke="#2a3038" stroke-width="7"/>
    <ellipse cx="880" cy="486" rx="20" ry="5" fill="#40352a"/>
    <line x1="912" y1="536" x2="956" y2="560" stroke="#b9a98a" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- overturned office chair, side view -->
  <g transform="translate(790,610)">
    <ellipse cx="100" cy="150" rx="170" ry="30" fill="#000" opacity=".38" filter="url(#bBlurS)"/>
    <!-- backrest lying horizontally -->
    <g transform="rotate(-7 160 50)">
      <rect x="50" y="4" width="230" height="92" rx="22" fill="#243044" stroke="#41516a" stroke-width="3"/>
      <rect x="68" y="18" width="194" height="64" rx="16" fill="url(#bMesh)" opacity=".9"/>
      <path d="M58 14 q8 -10 22 -10 h168 q14 0 22 10" fill="none" stroke="#5a7190" stroke-width="2" opacity=".55"/>
      <!-- headrest -->
      <rect x="268" y="18" width="52" height="64" rx="16" fill="#26344a" stroke="#41516a" stroke-width="3"/>
      <!-- lumbar bar -->
      <rect x="60" y="82" width="178" height="18" rx="8" fill="#2f3b4d" stroke="#41516a"/>
    </g>
    <!-- seat standing on edge -->
    <path d="M32 60 q-12 0 -12 12 l-8 116 q0 12 12 12 h74 q12 0 12 -12 l-6 -116 q0 -12 -12 -12 z" fill="#2a3444" stroke="#41516a" stroke-width="3" transform="rotate(10 62 130)"/>
    <path d="M42 72 q-6 0 -6 8 l-4 96 q0 8 8 8 h54 q8 0 8 -8 l-4 -96 q0 -8 -8 -8 z" fill="#33435a" opacity=".65" transform="rotate(10 62 130)"/>
    <!-- armrest -->
    <path d="M28 72 q-26 54 4 100" fill="none" stroke="#1e2733" stroke-width="10" stroke-linecap="round"/>
    <rect x="14" y="58" width="42" height="12" rx="6" fill="#2a3444" transform="rotate(-8 35 64)"/>
    <!-- gas lift -->
    <rect x="-4" y="116" width="16" height="62" rx="4" fill="#1e2733" transform="rotate(22 4 147)"/>
    <rect x="-16" y="164" width="26" height="14" rx="5" fill="#151d27" transform="rotate(22 0 171)"/>
    <!-- five-star base -->
    <g stroke="#1e2733" stroke-width="10" stroke-linecap="round">
      <line x1="-14" y1="176" x2="-92" y2="196"/><line x1="-14" y1="176" x2="42" y2="216"/>
      <line x1="-14" y1="176" x2="-52" y2="228"/><line x1="-14" y1="176" x2="20" y2="242"/>
      <line x1="-14" y1="176" x2="-14" y2="248"/>
    </g>
    <circle cx="-14" cy="176" r="10" fill="#18212c"/>
    <circle cx="-92" cy="196" r="7" fill="#0f151c"/><circle cx="42" cy="216" r="7" fill="#0f151c"/>
    <circle cx="-52" cy="228" r="7" fill="#0f151c"/><circle cx="20" cy="242" r="7" fill="#0f151c"/>
    <circle cx="-14" cy="248" r="7" fill="#0f151c"/>
  </g>

  <!-- rug pattern -->
  <g stroke="#8a6a48" stroke-opacity=".18" stroke-width="1.5" fill="none">
    <path d="M470 672 L800 672 L800 812 L360 812 Z"/><path d="M520 672 L800 672 L800 780 L400 780 Z"/>
    <path d="M620 672 L800 672 L800 720 L560 720 Z"/>
    <line x1="470" y1="672" x2="1250" y2="812"/><line x1="1130" y1="672" x2="360" y2="812"/>
  </g>
  <!-- lamp wall cast -->
  <ellipse cx="520" cy="430" rx="280" ry="180" fill="url(#bLamp)" opacity=".35"/>
  <ellipse cx="760" cy="612" rx="220" ry="80" fill="#ffcf86" opacity=".05" filter="url(#bBlur)"/>
  <!-- ambient -->
  <ellipse cx="1160" cy="480" rx="300" ry="220" fill="#7aa2c8" opacity=".05" filter="url(#bBlur)"/>
  <ellipse cx="560" cy="600" rx="260" ry="170" fill="#ffcf86" opacity=".07" filter="url(#bBlur)"/>
  <rect width="1600" height="900" filter="url(#bGrain)" opacity=".6"/>
  <rect width="1600" height="900" fill="url(#bVign)"/>
  </svg>`;
}
