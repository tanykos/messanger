import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
import validateForm from '../../utils/validateForm';

class LoginPage extends Block {
  constructor() {
    super({
      formData: formsData['login-form'],
      formInputs: fieldsData['login-form'],
      onSubmit: (e : Event) => validateForm(e),
    });
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <div class="form-center">
          <h1 class="title-center">{{formData.title}}</h1>

          {{{Form onSubmit=onSubmit formId="loginForm" formInputs=formInputs formData=formData}}}

          <a href="./pages/listChats-page" class="action-link" 
          style="margin-top: 30px; text-align: center;">Перейти в чаты</a>
        </div>
      </main>
    `;
  }
}

export default LoginPage;
