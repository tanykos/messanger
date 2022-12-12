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
}

class InputInline extends Block {
  constructor({ inputsData, isEdit }: ProfileContentProps) {
    super({
      inputsData,
      isEdit,
      events: {
        focusin: (e : Event) => validateField(e.target as Element, inputsData.name),
        focusout: (e : Event) => validateField(e.target as Element, inputsData.name),
      },
    });
  }

  static componentName = 'InputInline';

  render() {
    /* html */
    return `
    <div class="input-inline">
      <label for="{{inputsData.name}}" class="label">{{inputsData.label}}</label>
      {{#if isEdit}}
        <input value="{{inputsData.value}}"
          type="{{inputsData.type}}" 
          name="{{inputsData.name}}"
          required="{{inputsData.required}}"
          autocomplete="on"
          placeholder="&nbsp;">
        <span id="{{inputsData.name}}" class="error" aria-live="polite">Неверное поле</span>
      {{else}}
        <input value="{{inputsData.value}}"
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
