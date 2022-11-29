import Block from '../../utils/Block';

class Popup extends Block {
  constructor() {
    super();
  }

  static componentName = 'Popup';

  render() {
    /* html */
    return `
    <div id="popup" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Coming soon...</p>
      </div>
    </div>
    `;
  }
}

export default Popup;
