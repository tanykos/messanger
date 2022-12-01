import Block from '../../utils/Block';

class Avatar extends Block {
  static componentName = 'Avatar';

  render() {
    /* html */
    return `
    <div class="avatar-wrapper">
      <img class="profile-pic" src="//:0" />
      <div class="upload-button modal-show">
        <span class="inner-text">
          Поменять <br/> аватар
        </span>
      </div>
    </div>
    `;
  }
}

export default Avatar;
