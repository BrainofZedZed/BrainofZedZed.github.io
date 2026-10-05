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
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}
