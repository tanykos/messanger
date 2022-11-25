import Button from './components/Button/button';
import renderDOM from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-console
  const button = new Button({ label: 'Click me', events: { click: () => console.log('Clicked') } });

  renderDOM('#app', button);

  setTimeout(() => {
    // eslint-disable-next-line no-console
    button.setProps({ label: 'Click me please', events: { click: () => console.log('Clicked-2') } });
  }, 3000);

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
