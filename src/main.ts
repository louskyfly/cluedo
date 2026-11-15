import './styles/main.css';
import { renderApp } from './ui/app';

function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

renderApp(document.getElementById('app')!);
registerSW();
