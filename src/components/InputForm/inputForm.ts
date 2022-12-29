import Block from '../../utils/Block';
import { validateInput } from '../../utils/validateField';

interface InputFormProps {
  inputData: {
    label: string,
    name: string,
    required: boolean,
    type: string
  };
}

class InputForm extends Block {
  constructor({ inputData }: InputFormProps) {
    super({
      label: inputData.label,
      name: inputData.name,
      required: inputData.required,
      type: inputData.type,
      events: {
        focusin: validateInput,
        focusout: validateInput,
      },
    });
  }

  static componentName = 'InputForm';

  render() {
    /* html */
    return `
    <div class="field-floating">
      <label for="{{name}}" class="inp">
      <input type="{{type}}"
        name="{{name}}"
        required="{{required}}"
        autocomplete="on"
        placeholder="&nbsp;">
        <span class="label">{{label}}</span>
        <span class="focus-bg"></span>
        <span id="{{name}}" class="error" aria-live="polite">Неверное поле</span>
      </label>
    </div>
    `;
  }
}

export default InputForm;
