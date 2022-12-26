import Block from '../../utils/Block';
import { ChatInfo, Message as MessageInfo } from '../../types/types';
import modalData from '../../data/modalData.json';
import fieldsData from '../../data/fieldsData.json';
import store, { withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import { openModal, toggleClass } from '../../utils/helpers';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
  chats: ChatInfo[];
}

class MessengerBase extends Block {
  constructor(props: MessengerProps) {
    super({
      ...props,
      modalDataAdd: modalData.addChatUser,
      modalDataDelete: modalData.deleteChatUser,
      formInputs: fieldsData.сhatUserAdd,
      onClick: (e : Event) => this.onClick(e),
      events: {
        // click: (e: Event) => toggleClass(e, 'dropdown'),
      },
    });
  }

  static componentName = 'Messenger';

  onClick(e: Event) {
    console.log('Chat is clicked: ', e);
    // toggleClass(e, 'dropdown');
  }

  render() {
    // ChatsController.fetchChats();
    const { selectedChat } = this.props;
    const activeChatTitle = selectedChat ? this.props.chats.find((x: any) => x.id === selectedChat).title : '';
    /* html */
    return `
    {{#if ${selectedChat}}}
      <div class="layout-wrap">
        <div class="scroll-wrap">
          <div class="scroll-hidden">
            <header>
              <div class="row-items-3">
                <span class="item-1">
                  <span class="chat-avatar"></span>
                </span>
                <span class="item-2 text-bold">${activeChatTitle}</span>
                <span class="item-3 dropdown-wrap">
                  {{{DropdownBtn modalId='dropdown'}}}
                  
                  <div class="tooltip" id="dropdown">
                    {{{ModalOpenLink modalId='addChatUser' linkTitle='Добавить пользователя'}}}
                    {{{ModalOpenLink modalId='deleteChatUser' linkTitle='Удалить пользователя'}}}
                  </div>
                </span>
              </div>
            </header>

            {{{ModalChats modalId="addChatUser" modalData=modalDataAdd formInputs=formInputs chatId=selectedChat}}}
            {{{ModalChats modalId="deleteChatUser" modalData=modalDataDelete formInputs=formInputs chatId=selectedChat}}}

            <div class="content-wrap">
              <div class="content-scroll">
                {{#each chatDetails}}
                  {{{ChatDetails chatDetails=this}}}
                {{/each}}                
              </div>
            </div>
          
            <footer>
              {{{TextareaForm onSubmit=onSubmit}}}
            </footer>
          </div>
        </div>
      </div>
    {{else}}
      <div class="main-content">
        <h4 class="text-gray">Выберите чат, чтобы отправить сообщение</h4>
      </div>
    {{/if}}
    `;
  }
}

const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
      chats: [...(state.chats || [])],
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
    chats: [...(state.chats || [])],
  };
});
const Messenger = withChats(MessengerBase);

export default Messenger;
