// Image enlarge dialog
const dialog = document.querySelector('.image-dialog');
if (dialog) {
  const image = dialog.querySelector('img');
  const title = dialog.querySelector('h2');
  const caption = dialog.querySelector('p');
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      image.src = button.dataset.image;
      image.alt = button.dataset.caption;
      title.textContent = button.dataset.title;
      caption.textContent = button.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const b = dialog.getBoundingClientRect();
    if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close();
  });
}

// Highlight the nav link for the section currently on screen (homepage only)
const navLinks = [...document.querySelectorAll('.site-nav a[data-section]')];
if (navLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(navLinks.map(a => [a.dataset.section, a]));
  const visible = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
    let best = null, bestRatio = 0;
    visible.forEach((ratio, id) => { if (ratio > bestRatio) { best = id; bestRatio = ratio; } });
    navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.section === best));
  }, { rootMargin: '-90px 0px -45% 0px', threshold: [0, .1, .25, .5] });
  byId.forEach((_, id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
}
