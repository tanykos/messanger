import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
import validateForm from '../../utils/validateForm';
import AuthController from '../../controllers/AuthController';

class LoginPage extends Block {
  constructor() {
    super({
      formData: formsData['login-form'],
      formInputs: fieldsData['login-form'],
      onSubmit: (e : Event) => this.onSubmit(e),
    });
  }

  // onSubmit: (e : Event) => validateForm(e),
  onSubmit(e : Event) {
    const data = validateForm(e);
    if (data) { AuthController.signin(data); }
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <div class="form-center form-size">
          <h1 class="title-center">{{formData.title}}</h1>

          {{{Form onSubmit=onSubmit 
            formId="loginForm" 
            formInputs=formInputs 
            formData=formData
            className="form-stretch"}}}

          {{{Link label=formData.linkTitle to='/signup' className="form-center-actions action-link"}}}

        </div>
      </main>
    `;
  }
}

export default LoginPage;
