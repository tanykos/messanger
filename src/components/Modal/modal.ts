import ChatsController from '../../controllers/ChatsController';
import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import { closeModal } from '../../utils/helpers';
import { formDataImg } from '../../utils/uploadImg';
import validateForm from '../../utils/validateForm';

interface ModalProps {
  modalId: string;
  userId: number;
  modalData: Record<string, string>;
  formInputs: string;
}

class Modal extends Block {
  constructor({
    modalId,
    userId,
    modalData,
    formInputs,
  }: ModalProps) {
    super({
      modalId,
      userId,
      modalData,
      formInputs,
      onSubmitImg: (e : Event) => this.onSubmitImg(e),
      onAddChat: (e : Event) => this.onAddChat(e),
      // onSubmit: (e : Event) => this.onAddChat(e),
    });
  }

  static componentName = 'Modal';

  // onSubmit = this.props.modalData.isTextInp ? this.onAddChat : this.onSubmitImg;

  onSubmitImg(e : Event) {
    e.stopPropagation();

    const data = formDataImg(e);
    if (data) {
      UserController.updateAvatar(data, this.props.userId)
        .then(
          () => { closeModal(e, this.props.modalId); },
          // eslint-disable-next-line no-console
          (error) => { console.log(error); },
        );
    }
  }

  onAddChat(e: Event) {
    e.stopPropagation();

    const data = validateForm(e);
    if (data) {
      ChatsController.create(data.title)
        .then(
          () => {
            closeModal(e, this.props.modalId);
            const form = e.target as HTMLFormElement;
            form.reset();
          },
          // eslint-disable-next-line no-console
          (error) => { console.log(error); },
        );
    }
  }

  render() {
    console.log('this.props.modalData', this.props.modalData);
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
          {{#if modalData.isTextInp}}
            {{{Form onSubmit=onAddChat
              formId="addChatForm"
              formInputs=formInputs
              formData=modalData
              className="form-stretch"}}}
          {{else}}
            {{{FormUpload formData=modalData onSubmitImg=onSubmitImg}}}
          {{/if}}
        </div>
      </div>
    </div>
    `;
  }
}

export default Modal;
