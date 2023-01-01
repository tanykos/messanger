import Block from '../../utils/Block';
import { ChatInfo, Message as MessageInfo } from '../../types/types';
import modalData from '../../data/modalData.json';
import fieldsData from '../../data/fieldsData.json';
import { withStore } from '../../utils/Store';
import { formDataImg } from '../../utils/uploadImg';
import ChatsController from '../../controllers/ChatsController';
import { closeModal } from '../../utils/helpers';

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
      modalDataAvatar: modalData.uploadAvatar,
      formInputsAdd: fieldsData.сhatUserAdd,
      formInputsDelete: fieldsData.сhatUserDelete,
      onSubmitAvatar: (e : Event) => this.onSubmitAvatar(e),
    });
  }

  static componentName = 'Messenger';

  onSubmitAvatar(e : Event) {
    e.stopPropagation();

    // inputId = modalId + Form-input
    const inputId = 'chatAvatarForm-input';
    const data = formDataImg(e, inputId);

    if (data) {
      data.append('chatId', this.props.selectedChat);
      ChatsController.addAvatar(data)
        .then(
          () => { closeModal(e, 'chatAvatar'); },
          // eslint-disable-next-line no-console
          (error) => { console.log(error); },
        );
    }
  }

  render() {
    const { selectedChat } = this.props;
    const activeChat = selectedChat ? this.props.chats?.find((x: any) => x.id === selectedChat)
      : undefined;
    const activeChatTitle = activeChat?.title;
    const avatarPath = activeChat?.avatar ? activeChat?.avatar : '';

    /* html */
    return `
    {{#if ${selectedChat}}}
      <div class="layout-wrap">
        <div class="scroll-wrap">
          <div class="scroll-hidden">
            <header>
              <div class="row-items-3">
                <span class="item-1">
                  {{{Avatar modalId="chatAvatar" className="chat-avatar" avatarPath="${avatarPath}"}}}        
      
                  {{{Modal modalId="chatAvatar" onSubmit=onSubmitAvatar modalData=modalDataAvatar chatId=${selectedChat}}}}
                  
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

            {{{ModalChats modalId="addChatUser" modalData=modalDataAdd formInputs=formInputsAdd chatId=selectedChat}}}
            {{{ModalChats modalId="deleteChatUser" modalData=modalDataDelete formInputs=formInputsDelete chatId=selectedChat isDelete=true}}}

            <div class="content-wrap">
              <div class="content-scroll scroll-reverse">
                <section class="chat-detail">
                  {{#each messages}}
                    {{{ChatMessage message=this userId=../userId}}}
                  {{/each}}            
                </section>
              </div>
            </div>
          
            <footer>
              {{{TextareaForm selectedChat=selectedChat}}}
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
