import Block from '../../utils/Block';
import { ChatInfo } from '../../types/types';
import modalData from '../../data/modalData.json';
import fieldsData from '../../data/fieldsData.json';
import store, { withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';

interface ChatsListProps {
  chats: ChatInfo[];
  onClick?: () => void
}

class ChatsListBase extends Block {
  constructor(props: ChatsListProps) {
    super({
      chats: props.chats,
      modalData: modalData.addChat,
      formInputs: fieldsData.addChat,
      events: {
        click: (e : Event) => this.onClick(e),
      },
    });
  }

  static componentName = 'ChatsList';

  onClick(e: Event) {
    console.log('Chat is clicked');
  }

  render() {
    // ChatsController.fetchChats();
    console.log('chatsList', this.props.chats);
    /* html */
    return `
      <div class="sidebar-chat">
        <header>
          {{{Link label="Профиль" iconClass="fa-solid fa-chevron-right" to='/settings' className="action-link icon-link item-left"}}}
          
          {{{ModalOpenLink modalId='addChat' linkTitle='Создать чат'}}}

          {{{Modal modalId="addChat" modalData=modalData formInputs=formInputs userId=formData.id}}}
        </header>

        {{#each chats}}
          {{{ChatSection chatsData=this}}}
        {{/each}}
        
      </div>
    `;
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));
const ChatsList = withChats(ChatsListBase);

export default ChatsList;

// <form class="form-group has-search">
//             <span class="input-search-icon">
//               <span class="fa fa-search"></span>
//             </span>
//             <input type="text" class="input-search" placeholder="Поиск">
//           </form>
