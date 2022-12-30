import Block from '../../utils/Block';
import { ChatInfo } from '../../types/types';
import modalData from '../../data/modalData.json';
import fieldsData from '../../data/fieldsData.json';
import { withStore } from '../../utils/Store';
import validateForm from '../../utils/validateForm';
import ChatsController from '../../controllers/ChatsController';
import { closeModal } from '../../utils/helpers';

interface ChatsListProps {
  chats: ChatInfo[];
  onClick?: () => void
}

class ChatsListBase extends Block {
  constructor(props: ChatsListProps) {
    super({
      ...props,
      modalData: modalData.addChat,
      formInputs: fieldsData.addChat,
      modalDataDel: modalData.deleteChat,
      formInputsDel: fieldsData.deleteChat,
      onDeleteChat: (e : Event) => this.onDeleteChat(e),
      onAddChat: (e : Event) => this.onAddChat(e),
    });
  }

  static componentName = 'ChatsList';

  onAddChat(e: Event) {
    e.stopPropagation();

    const data = validateForm(e);
    if (data) {
      ChatsController.create(data.title)
        .then(
          () => {
            closeModal(e, 'addChat');
            const form = e.target as HTMLFormElement;
            form.reset();
          },
          // eslint-disable-next-line no-console
          (error) => { console.log(error); },
        );
    }
  }

  onDeleteChat(e: Event) {
    e.stopPropagation();

    const data = validateForm(e);
    if (data) {
      ChatsController.delete(data.chatId)
        .then(
          () => {
            closeModal(e, 'deleteChat');
            const form = e.target as HTMLFormElement;
            form.reset();
          },
          (error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            // eslint-disable-next-line no-alert
            alert('Вы не можете удалить этот чат. Введите id чата, который создали вы.');
          },
        );
    }
  }

  render() {
    /* html */
    return `
      <div class="sidebar-chat">
        <header>
          {{{Link label="Профиль" iconClass="fa-solid fa-chevron-right" to='/settings' className="action-link icon-link item-left"}}}

          <div class="chat-actions">
            {{{ModalOpenLink modalId='addChat' linkTitle='Создать чат'}}}
            {{{ModalOpenLink modalId='deleteChat' linkTitle='Удалить чат' className="red"}}}          
          </div>

          {{{Modal modalId="addChat" modalData=modalData formInputs=formInputs userId=formData.id onSubmit=onAddChat}}}

          {{{Modal modalId="deleteChat" modalData=modalDataDel formInputs=formInputsDel userId=formData.id onSubmit=onDeleteChat}}}
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
