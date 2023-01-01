import Block from '../../utils/Block';
import chatsData from '../../data/chatsData.json';
import ChatsController from '../../controllers/ChatsController';
import AuthController from '../../controllers/AuthController';

class ListChatsPage extends Block {
  constructor() {
    super({
      chatDetails: chatsData.chatsList[0].chatDetails,
    });

    AuthController.fetchUser();
    ChatsController.fetchChats();
  }

  render() {
    /* html */
    return `
    <main class="layout-col-2 layout-footer-stick">

      {{{ChatsList}}}

      {{{Messenger}}}
            
    </main>
    `;
  }
}

export default ListChatsPage;
