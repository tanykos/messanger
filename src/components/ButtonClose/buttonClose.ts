import Block from '../../utils/Block';
import { closeModal } from '../../utils/helpers';

interface ButtonCloseProps {
  modalId: string;
}

class ButtonClose extends Block<ButtonCloseProps> {
  constructor({ modalId }: ButtonCloseProps) {
    super({
      modalId,
      events: {
        click: (e: Event) => closeModal(e, modalId),
      },
    });
  }

  static componentName = 'ButtonClose';

  render() {
    /* html */
    return `
    <span class="close">&times;</span>
    `;
  }
}

export default ButtonClose;
