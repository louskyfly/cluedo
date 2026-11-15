let ctx: AudioContext | null = null;
function ensure() {
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext);
    if (AC) ctx = new AC();
  }
  return ctx;
}
export function playTone(freq = 440, dur = 0.08, type: OscillatorType = 'sine', vol = 0.04) {
  const c = ensure(); if (!c) return;
  if (c.state === 'suspended') c.resume().catch(()=>{});
  const o = c.createOscillator(); const g = c.createGain();
  o.type = type; o.frequency.value = freq; g.gain.value = vol;
  o.connect(g); g.connect(c.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.stop(c.currentTime + dur);
}
export function sfx(kind: 'click'|'discover'|'success'|'error', enabled: boolean) {
  if (!enabled) return;
  try {
    if (kind==='click') playTone(520,0.05,'triangle',0.03);
    else if (kind==='discover') { playTone(660,0.09,'sine',0.05); setTimeout(()=>playTone(880,0.12,'sine',0.05),90); }
    else if (kind==='success') { playTone(523,0.1,'sine',0.05); setTimeout(()=>playTone(659,0.1,'sine',0.05),110); setTimeout(()=>playTone(784,0.18,'sine',0.05),220); }
    else if (kind==='error') { playTone(220,0.18,'sawtooth',0.03); }
  } catch {}
}
