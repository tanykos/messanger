import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';

class ChatPage extends Block {
  constructor() {
    super({
      onClick: () => console.log('Clicked'),
      formData: formsData['registration-form'],
      formInputs: fieldsData['registration-form'],
    });
  }

  render() {
    /* html */
    return `
      <main class="items-center">
      <h1 class="title-center">Chat Page</h1>
      </main>
    `;
  }
}

export default ChatPage;
