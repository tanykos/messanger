import Block from '../../utils/Block';
import { uploadImg } from '../../utils/uploadImg';

interface FormUploadProps {
  formData: string;
  formId: string;
  onSubmitImg?: () => void;
}

class FormUpload extends Block {
  constructor({
    formData, formId, onSubmitImg,
  }: FormUploadProps) {
    super({
      formData,
      formId,
      onSubmitImg,
      events: {
        change: (e : Event) => uploadImg(e),
        submit: (e : Event) => this.props.onSubmitImg(e),
      },
    });
  }

  static componentName = 'FormUpload';

  render() {
    /* html */
    return `
      <form id="{{formId}}" novalidate class="{{className}}">
        <div class="form-center-content">
          <div class="upload-file-wrapper">
            <label for="{{formId}}-input" class="upload-file-label">{{formData.inputLabel}}</label>
            <input name="avatar" type="file" accept="image/png, image/jpeg" class="upload-file-input" id="{{formId}}-input">
          </div>

          <div class="file-name">
          </div>

        </div>

        <div class="form-center-actions">
          {{{Button label=formData.buttonLabel}}}
        </div>

      </form>
    `;
  }
}

export default FormUpload;
