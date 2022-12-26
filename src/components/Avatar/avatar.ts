import Block from '../../utils/Block';
import { openModal } from '../../utils/helpers';

interface AvatarProps {
  modalId: string;
  avatarPath: string;
}

class Avatar extends Block {
  constructor({
    modalId,
    avatarPath,
  }: AvatarProps) {
    super({
      modalId,
      avatarPath,
      events: {
        click: (e: Event) => openModal(e, modalId),
      },
    });
  }

  static componentName = 'Avatar';

  render() {
    console.log('avatar-props', this.props.avatarPath);
    const src = this.props.avatarPath ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatarPath}` : '//:0';

    /* html */
    return `
    <div class="avatar-wrapper avatar-hover">
      <img class="profile-pic" src=${src} alt=""/>
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
