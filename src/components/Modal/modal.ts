import Block from '../../utils/Block';

interface ModalProps {
  modalId: string;
  userId: number;
  chatId?: number;
  modalData: Record<string, string>;
  formInputs: string;
  onSubmit?: (e: Event) => void;
}

class Modal extends Block {
  constructor({
    modalId,
    userId,
    chatId,
    modalData,
    formInputs,
    onSubmit,
  }: ModalProps) {
    super({
      modalId,
      userId,
      chatId,
      modalData,
      formInputs,
      onSubmit,
    });
  }

  static componentName = 'Modal';

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
            {{{FormUpload formData=modalData onSubmitImg=onSubmit formId='${this.props.modalId}Form'}}}
          {{/if}}
        </div>
      </div>
    </div>
    `;
  }
}

export default Modal;
