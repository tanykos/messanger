import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { closeModal } from '../../utils/helpers';
import validateForm from '../../utils/validateForm';

interface ModalChatsProps {
  modalId: string;
  chatId: number;
  modalData: Record<string, string>;
  formInputs: string;
}

class ModalChats extends Block {
  constructor({
    modalId,
    chatId,
    modalData,
    formInputs,
  }: ModalChatsProps) {
    super({
      modalId,
      chatId,
      modalData,
      formInputs,
      onAddUser: (e : Event) => this.onAddUser(e),
      // onSubmit: (e : Event) => this.onAddChat(e),
    });
  }

  static componentName = 'ModalChats';

  onAddUser(e: Event) {
    e.stopPropagation();

    const value = validateForm(e);
    if (value) {
      ChatsController.addUserToChat(this.props.chatId, value.users);
      closeModal(e, this.props.modalId);
      const form = e.target as HTMLFormElement;
      form.reset();
    }
  }

  render() {
    console.log('props modalChat', this.props);
    /* html */
    return `
    <div id="{{modalId}}" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{modalData.title}}</h3>
          {{{ButtonClose modalId=modalId}}}
        </div>

        <div class="modal-body form-center">
          {{{Form onSubmit=onAddUser
            formId="addChatUser"
            formInputs=formInputs
            formData=modalData
            className="form-stretch"}}}
        </div>
      </div>
    </div>
    `;
  }
}

export default ModalChats;
