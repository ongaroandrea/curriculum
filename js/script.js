document.querySelectorAll('[data-print]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});

// The email address is stored reversed and base64-encoded in data-mail, so it
// never appears in the HTML that spam bots scrape. It is put together here.
document.querySelectorAll('[data-mail]').forEach((link) => {
  const address = atob(link.dataset.mail).split('').reverse().join('');
  link.href = `mailto:${address}`;
  link.textContent = address;
});

// Light/dark toggle. Without a saved choice the page follows the device
// setting; a click saves the choice (applied early by the snippet in <head>).
const icons = {
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
};
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const root = document.documentElement;
const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

const toggle = document.createElement('button');
toggle.type = 'button';
toggle.className = 'theme-toggle';

function renderToggle() {
  const dark = currentTheme() === 'dark';
  toggle.innerHTML = dark ? icons.sun : icons.moon;
  toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  toggle.title = toggle.getAttribute('aria-label');
}

toggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
  renderToggle();
});
systemDark.addEventListener('change', renderToggle);

renderToggle();
document.body.prepend(toggle);
