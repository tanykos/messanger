import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
import getFormValues from '../../utils/getFormValues';

class LoginPage extends Block {
  constructor(props: { buttonLabel: string }) {
    super({
      ...props,
      formData: formsData['login-form'],
      formInputs: fieldsData['login-form'],
      onSubmit: (e : Event) => getFormValues(e),
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

// <form id="login-form">
//           <div class="form-center-content">
//             {{#each formInputs}}
//               {{{InputForm inputData=this}}}
//             {{/each}}
//           </div>

//           <div class="form-center-actions">
//             {{{Button label=formData.buttonLabel}}}
//             <a href="{{formData.linkHref}}" class="action-link">{{formData.linkTitle}}</a>
//           </div>

//         </form>
