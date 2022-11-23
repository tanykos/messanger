document.addEventListener('DOMContentLoaded', () => {
  // Modal
  const popup = document.getElementById('popup');
  // let span = document.getElementsByClassName("close")[0];
  const span: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;

  document.querySelector('.modal-show')!.addEventListener('click', () => {
    popup!.style.display = 'block';
  });

  // Close the modal
  span.onclick = () => {
    popup!.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === popup) {
      popup!.style.display = 'none';
    }
  };
});
