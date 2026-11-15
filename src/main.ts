import './styles/main.css';
import { renderApp } from './ui/app';

function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

if (import.meta.env.PROD) {
  registerSW();
} else if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
  if ('caches' in window) caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
}

renderApp(document.getElementById('app')!);
