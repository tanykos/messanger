import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
import validateForm from '../../utils/validateForm';
import AuthController from '../../controllers/AuthController';

class RegistrationPage extends Block {
  constructor() {
    super({
      formData: formsData['registration-form'],
      formInputs: fieldsData['registration-form'],
      onSubmit: (e : Event) => this.onSubmit(e),
    });
  }

  onSubmit(e : Event) {
    const data = validateForm(e);
    if (data) { AuthController.signup(data); }
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <div class="form-center form-size">
          <h1 class="title-center">{{formData.title}}</h1>

          {{{Form onSubmit=onSubmit formId="regForm" formInputs=formInputs formData=formData}}}

        </div>

      </main>
    `;
  }
}

export default RegistrationPage;
