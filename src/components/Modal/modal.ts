import Block from '../../utils/Block';

class Modal extends Block {
  static componentName = 'Modal';

  render() {
    /* html */
    return `
    <div id="modal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Coming soon...</p>
      </div>
    </div>
    `;
  }
}

export default Modal;
