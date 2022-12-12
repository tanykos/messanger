import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
import validateForm from '../../utils/validateForm';

class RegistrationPage extends Block {
  constructor() {
    super({
      formData: formsData['registration-form'],
      formInputs: fieldsData['registration-form'],
      onSubmit: (e : Event) => validateForm(e),
    });
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <div class="form-center">
          <h1 class="title-center">{{formData.title}}</h1>

          {{{Form onSubmit=onSubmit formId="regForm" formInputs=formInputs formData=formData}}}

        </div>

      </main>
    `;
  }
}

export default RegistrationPage;
