import Block from '../../utils/Block';
import validateField from '../../utils/validateField';

interface ProfileContentProps {
  inputsData: {
    'name': string,
    'label': string,
    'type': string,
    'required': boolean,
    'value': string
  };
  isEdit: boolean;
  formData: Record<string, unknown>;
}

class InputInline extends Block {
  constructor({ formData, inputsData, isEdit }: ProfileContentProps) {
    super({
      formData,
      inputsData,
      isEdit,
      events: {
        focusin: (e : Event) => isEdit && validateField(e.target as Element),
        focusout: (e : Event) => isEdit && validateField(e.target as Element),
      },
    });
  }

  static componentName = 'InputInline';

  render() {
    const inputName = this.props.inputsData.name;
    const inputValue = this.props.formData[inputName] || '';
    console.log('formData2: ', this.props.formData);

    /* html */
    return `
    <div class="input-inline">
      <label for="{{inputsData.name}}" class="label">{{inputsData.label}}</label>
      {{#if isEdit}}
        <input value="${inputValue}"
          type="{{inputsData.type}}" 
          name="{{inputsData.name}}"
          required="{{inputsData.required}}"
          autocomplete="on"
          placeholder="&nbsp;">
        <span id="{{inputsData.name}}" class="error" aria-live="polite">Неверное поле</span>
      {{else}}
        <input value="${inputValue}"
          readonly
          type="{{inputsData.type}}" 
          name="{{inputsData.name}}"
          required="{{inputsData.required}}"
          autocomplete="on"
          placeholder="&nbsp;">
          <span id="{{inputsData.name}}" class="error" aria-live="polite">Неверное поле</span>
      {{/if}}
    </div>
    `;
  }
}

export default InputInline;
