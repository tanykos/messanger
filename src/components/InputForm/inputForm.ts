import Block from '../../utils/Block';

interface InputFormProps {
  inputData: {
    label: string,
    name: string,
    required: boolean,
    type: string
  };
  onClick?: () => void
}

class InputForm extends Block {
  constructor({ inputData, onClick }: InputFormProps) {
    super({
      label: inputData.label,
      name: inputData.name,
      required: inputData.required,
      type: inputData.type,
      events: {
        click: onClick,
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
        placeholder="&nbsp;">
      <span class="label">{{label}}</span>
      <span class="focus-bg"></span>
      </label>
    </div>
    `;
  }
}

export default InputForm;
