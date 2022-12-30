import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import { closeModal } from '../../utils/helpers';
import { formDataImg } from '../../utils/uploadImg';

interface ModalProps {
  modalId: string;
  userId: number;
  modalData: Record<string, string>;
  formInputs: string;
  onSubmit?: (e: Event) => void;
}

class Modal extends Block {
  constructor({
    modalId,
    userId,
    modalData,
    formInputs,
    onSubmit,
  }: ModalProps) {
    super({
      modalId,
      userId,
      modalData,
      formInputs,
      onSubmit,
      onSubmitImg: (e : Event) => this.onSubmitImg(e),
    });
  }

  static componentName = 'Modal';

  onSubmitImg(e : Event) {
    e.stopPropagation();

    const data = formDataImg(e);
    if (data) {
      UserController.updateAvatar(data)
        .then(
          () => { closeModal(e, this.props.modalId); },
          // eslint-disable-next-line no-console
          (error) => { console.log(error); },
        );
    }
  }

  render() {
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
            {{{Form onSubmit=onSubmit
              formId='${this.props.modalId}Form'
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
