export function caseCoverArt(id: string): string {
  const base = `<defs>
    <linearGradient id="cvBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b2230"/><stop offset="1" stop-color="#070a0e"/></linearGradient>
    <radialGradient id="cvGlow" cx=".5" cy=".45" r=".55"><stop offset="0" stop-color="#c9a46a" stop-opacity=".35"/><stop offset="1" stop-color="#c9a46a" stop-opacity="0"/></radialGradient>
    <filter id="cvBlur"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="cvGrain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer></filter>
  </defs>`;
  if (id === 'case1') {
    return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${base}
      <rect width="600" height="340" fill="url(#cvBg)"/>
      <ellipse cx="300" cy="160" rx="220" ry="150" fill="url(#cvGlow)"/>
      <g stroke="#2c3b4d" stroke-width="2" opacity=".6">
        <line x1="40" y1="280" x2="300" y2="30"/><line x1="150" y1="300" x2="320" y2="30"/>
        <line x1="450" y1="300" x2="300" y2="30"/><line x1="560" y1="280" x2="300" y2="30"/>
      </g>
      <rect x="210" y="40" width="180" height="260" rx="6" fill="#0a1119" stroke="#2a3a4d" stroke-width="3"/>
      <rect x="228" y="58" width="144" height="224" fill="#0b1622"/>
      <g opacity=".8"><rect x="250" y="90" width="100" height="10" rx="3" fill="#1c3a4a"/><rect x="250" y="112" width="70" height="8" rx="3" fill="#1c3a4a"/></g>
      <g transform="translate(300,180)">
        <path d="M-38 -58 h76" stroke="#9fb6c9" stroke-width="7"/>
        <path d="M-28 -58 v42 l-40 78 a18 18 0 0 0 16 26 h104 a18 18 0 0 0 16 -26 l-40 -78 v-42" fill="#0f2a2a" stroke="#67d8c8" stroke-width="4"/>
        <path d="M-50 40 h100 l-24 36 h-52 z" fill="#2a8a78" opacity=".55"/>
        <circle cx="0" cy="20" r="10" fill="#67e0c8" opacity=".55"/>
      </g>
      <circle cx="300" cy="150" r="120" fill="none" stroke="#c9a46a" stroke-opacity=".18" stroke-width="2"/>
      <rect width="600" height="340" filter="url(#cvGrain)" opacity=".55"/>
      <rect width="600" height="340" fill="url(#cvBg)" opacity=".1"/>
    </svg>`;
  }
  if (id === 'case2') {
    return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${base}
      <rect width="600" height="340" fill="#0a1018"/>
      <ellipse cx="300" cy="120" rx="260" ry="140" fill="url(#cvGlow)" opacity=".5"/>
      <g fill="#141d29">
        <rect x="80" y="70" width="440" height="230"/>
        <rect x="120" y="40" width="360" height="260"/>
        <rect x="160" y="20" width="280" height="280"/>
      </g>
      <g fill="#2a3546" opacity=".7">
        <rect x="100" y="90" width="40" height="190"/><rect x="150" y="60" width="40" height="220"/><rect x="200" y="40" width="40" height="240"/>
        <rect x="250" y="30" width="40" height="250"/><rect x="300" y="40" width="40" height="240"/><rect x="350" y="60" width="40" height="220"/>
        <rect x="400" y="90" width="40" height="190"/>
      </g>
      <g fill="#ffcf86">
        <rect x="110" y="120" width="8" height="12"/><rect x="160" y="90" width="8" height="12"/><rect x="260" y="70" width="8" height="12"/>
        <rect x="310" y="80" width="8" height="12"/><rect x="410" y="130" width="8" height="12"/><rect x="360" y="160" width="8" height="12"/>
        <rect x="210" y="150" width="8" height="12"/>
      </g>
      <rect x="250" y="210" width="100" height="90" fill="#05080c"/>
      <path d="M275 210 v-34 a25 25 0 0 1 50 0 v34" fill="none" stroke="#c9a46a" stroke-width="4" opacity=".7"/>
      <ellipse cx="300" cy="260" rx="150" ry="60" fill="#c9a46a" opacity=".05" filter="url(#cvBlur)"/>
      <rect width="600" height="340" filter="url(#cvGrain)" opacity=".55"/>
    </svg>`;
  }
  if (id === 'case3') {
    return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${base}
      <rect width="600" height="340" fill="#0b0d12"/>
      <ellipse cx="300" cy="150" rx="260" ry="160" fill="url(#cvGlow)" opacity=".55"/>
      <g fill="#151b26">
        <rect x="0" y="60" width="120" height="280"/><rect x="480" y="60" width="120" height="280"/>
        <rect x="0" y="40" width="600" height="20"/>
      </g>
      <g fill="#222c3d">
        <rect x="30" y="80" width="60" height="240"/><rect x="510" y="80" width="60" height="240"/>
      </g>
      <rect x="230" y="80" width="140" height="180" fill="#0a0e14" stroke="#c9a46a" stroke-width="3"/>
      <rect x="244" y="94" width="112" height="152" fill="#05080c"/>
      <g stroke="#c9a46a" stroke-width="2" opacity=".5"><line x1="244" y1="94" x2="356" y2="246"/><line x1="356" y1="94" x2="244" y2="246"/></g>
      <polygon points="270,280 330,280 360,340 240,340" fill="#c9a46a" opacity=".08"/>
      <circle cx="300" cy="170" r="90" fill="none" stroke="#c9a46a" stroke-opacity=".15"/>
      <rect width="600" height="340" filter="url(#cvGrain)" opacity=".55"/>
    </svg>`;
  }
  if (id === 'case4') {
    return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${base}
      <rect width="600" height="340" fill="#090d12"/>
      <ellipse cx="300" cy="130" rx="260" ry="140" fill="url(#cvGlow)" opacity=".4"/>
      <g fill="#111922">
        <polygon points="0,340 0,80 180,40 180,340"/>
        <polygon points="600,340 600,80 420,40 420,340"/>
      </g>
      <g fill="#1c2835">
        <rect x="180" y="40" width="240" height="300"/>
        <rect x="220" y="60" width="160" height="80" fill="#0a1119"/>
      </g>
      <circle cx="300" cy="150" r="40" fill="#ffe0a8" opacity=".85"/>
      <circle cx="300" cy="150" r="70" fill="#ffe0a8" opacity=".12" filter="url(#cvBlur)"/>
      <g stroke="#c9a46a" stroke-width="4" opacity=".5"><line x1="0" y1="260" x2="600" y2="260"/><line x1="40" y1="280" x2="560" y2="280"/></g>
      <rect x="250" y="200" width="100" height="80" rx="4" fill="#0a0e14" stroke="#314052"/>
      <g fill="#c9a46a"><rect x="270" y="216" width="20" height="14"/><rect x="300" y="216" width="20" height="14"/><rect x="330" y="216" width="10" height="14"/></g>
      <g fill="#ffe0a8" opacity=".5">
        <circle cx="460" cy="180" r="2"/><circle cx="140" cy="220" r="1.5"/><circle cx="380" cy="250" r="1.5"/>
      </g>
      <rect width="600" height="340" filter="url(#cvGrain)" opacity=".6"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${base}
    <rect width="600" height="340" fill="#071018"/>
    <ellipse cx="300" cy="120" rx="260" ry="160" fill="#5fb3c4" opacity=".12"/>
    <g stroke="#67d8c8" stroke-width="2" opacity=".25"><path d="M0 120 q150 -90 300 0 t300 0"/><path d="M0 90 q150 -70 300 0 t300 0"/></g>
    <g fill="#0d1b26">
      <polygon points="60,300 120,200 220,200 280,300"/>
      <polygon points="320,300 380,200 480,200 540,300"/>
      <rect x="220" y="170" width="160" height="130"/>
    </g>
    <g fill="#ffcf86" opacity=".8"><rect x="240" y="190" width="10" height="10"/><rect x="270" y="190" width="10" height="10"/><rect x="330" y="190" width="10" height="10"/><rect x="300" y="220" width="10" height="10"/></g>
    <g stroke="#7aa2c8" stroke-width="3" opacity=".4"><line x1="300" y1="30" x2="300" y2="170"/><line x1="280" y1="50" x2="280" y2="170"/></g>
    <rect width="600" height="340" filter="url(#cvGrain)" opacity=".55"/>
  </svg>`;
}
