import Block from '../../utils/Block';

interface FormProps {
  formInputs: string;
  formData: string;
  formId: string;
  onSubmit?: () => void;
}

class Form extends Block {
  constructor({
    formInputs, formData, formId, onSubmit,
  }: FormProps) {
    super({
      formInputs,
      formData,
      formId,
      events: {
        submit: onSubmit,
      },
    });
  }

  static componentName = 'Form';

  render() {
    /* html */
    return `
    <form id={{formId}} novalidate>
      <div class="form-center-content">
        {{#each formInputs}}
          {{{InputForm onFocus=onFocus inputData=this}}}
        {{/each}}
      </div>

      <div class="form-center-actions">
        {{{Button label=formData.buttonLabel}}}       
        <a href="{{formData.linkHref}}" class="action-link">{{formData.linkTitle}}</a>
      </div>

  </form>
    
        
    </div>
    `;
  }
}

export default Form;
