import Block from '../../utils/Block';

interface FormProps {
  formInputs: string;
  formData: string;
  formId: string;
  className?: string;
  onSubmit?: () => void;
}

class Form extends Block {
  constructor({
    formInputs, formData, formId, onSubmit, className,
  }: FormProps) {
    super({
      formInputs,
      formData,
      formId,
      className,
      events: {
        submit: onSubmit,
      },
    });
  }

  static componentName = 'Form';

  render() {
    /* html */
    return `
    <form id={{formId}} novalidate class="{{className}}">
      <div class="form-center-content">
        {{#each formInputs}}
          {{{InputForm onFocus=onFocus inputData=this}}}
        {{/each}}
      </div>

      <div class="form-center-actions">
        {{{Button label=formData.buttonLabel}}}
      </div>

  </form>
    
        
    </div>
    `;
  }
}

export default Form;

// <a href="{{formData.linkHref}}" class="action-link">{{formData.linkTitle}}</a>
