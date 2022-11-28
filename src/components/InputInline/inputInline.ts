import Block from '../../utils/Block';

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
          placeholder="&nbsp;">
      {{else}}
        <input value="{{inputsData.value}}"
          readonly
          type="{{inputsData.type}}" 
          name="{{inputsData.name}}"
          required="{{inputsData.required}}"
          placeholder="&nbsp;">
      {{/if}}
    </div>
    `;
  }
}

export default InputInline;
