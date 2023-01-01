import Block from '../../utils/Block';
import { openModal } from '../../utils/helpers';

interface ModalOpenLinkProps {
  modalId: string;
  linkTitle: string;
  className?: string;
}

class ModalOpenLink extends Block {
  constructor(props: ModalOpenLinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => openModal(e, this.props.modalId),
      },
    });
  }

  static componentName = 'ModalOpenLink';

  render() {
    /* html */
    return `
      <div class="js-modal-btn">
        <span class="action-link {{#if className}}${this.props.className}{{/if}}">
          {{linkTitle}}
        </span>
      </div>
    `;
  }
}

export default ModalOpenLink;
