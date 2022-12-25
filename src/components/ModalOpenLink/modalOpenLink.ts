import Block from '../../utils/Block';
import { openModal } from '../../utils/helpers';

interface ModalOpenLinkProps {
  modalId: string;
  linkTitle: string;
}

class ModalOpenLink extends Block {
  constructor({
    modalId,
    linkTitle,
  }: ModalOpenLinkProps) {
    super({
      modalId,
      linkTitle,
      events: {
        click: (e: Event) => openModal(e, modalId),
      },
    });
  }

  static componentName = 'ModalOpenLink';

  render() {
    /* html */
    return `
      <div class="js-modal-btn">
        <span class="action-link">
          {{linkTitle}}
        </span>
      </div>
    `;
  }
}

export default ModalOpenLink;
