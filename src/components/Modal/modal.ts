import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import { closeModal } from '../../utils/helpers';
import { formDataImg } from '../../utils/uploadImg';

interface ModalProps {
  modalId: string;
  userId: number;
  modalData: Record<string, string>;
}

class Modal extends Block {
  constructor({
    modalId,
    userId,
    modalData,
  }: ModalProps) {
    super({
      modalId,
      userId,
      modalData,
      onSubmitImg: (e : Event) => this.onSubmitImg(e),
    });
  }

  static componentName = 'Modal';

  onSubmitImg(e : Event) {
    e.stopPropagation();

    const data = formDataImg(e);
    if (data) {
      UserController.updateAvatar(data, this.props.userId)
        .then(
          () => { closeModal(e, this.props.modalId); },
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
          {{{FormUpload formData=modalData onSubmitImg=onSubmitImg}}}
        </div>
      </div>
    </div>
    `;
  }
}

export default Modal;
