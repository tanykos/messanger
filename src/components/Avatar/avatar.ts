import Block from '../../utils/Block';
import { openModal } from '../../utils/helpers';

interface AvatarProps {
  modalId: string;
  avatarPath?: string;
  className?: string;
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => openModal(e, this.props.modalId),
      },
    });
  }

  static componentName = 'Avatar';

  render() {
    const src = (this.props.avatarPath) ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatarPath}` : '//:0';

    /* html */
    return `
    <div class="avatar-wrapper avatar-hover {{#if className}}${this.props.className}{{/if}}">
      {{#if avatarPath}}
        <img class="profile-pic" src=${src} alt="Avatar"/>
      {{else}}
        <span class="profile-pic"></span>
      {{/if}}
      <div class="upload-button js-modal-btn">
        <span class="inner-text">
          Поменять <br/> аватар
        </span>
      </div>
    </div>
    `;
  }
}

export default Avatar;
