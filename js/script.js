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
