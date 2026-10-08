import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter-tight';
import '@fontsource-variable/jetbrains-mono';
import './styles/global.css';
import './styles/tradifier.css';
import App from './App';

console.log(
  "%ctradifier@studio:~$%c you opened the console — you're our kind of people. there's a terminal on the page too: press ` to find it.",
  'color:#ff5a36;font-family:monospace',
  'color:#a3a29c;font-family:monospace',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
