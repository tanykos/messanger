import Block from './Block';

function renderDOM(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Элемент не найден!');
  }

  root.innerHTML = '';

  root.append(component.getContent()!);
}

export default renderDOM;
