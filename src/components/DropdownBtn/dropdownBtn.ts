import Block from '../../utils/Block';
import { toggleClass } from '../../utils/helpers';

interface DropdownBtnProps {
  modalId: string;
  linkTitle: string;
}

class DropdownBtn extends Block {
  constructor({
    modalId,
    linkTitle,
  }: DropdownBtnProps) {
    super({
      modalId,
      linkTitle,
      events: {
        click: (e: Event) => toggleClass(e, modalId),
      },
    });
  }

  static componentName = 'DropdownBtn';

  render() {
    /* html */
    return `
      <button class="chat-avatar">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
    `;
  }
}

export default DropdownBtn;
