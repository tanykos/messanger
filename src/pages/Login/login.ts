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
      onClick: (e : Event) => getFormValues(e, 'login-form'),
    });
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <form id="login-form" class="form-center">
          <h1 class="title-center">{{formData.title}}</h1>

          <div class="form-center-content">
            {{#each formInputs}}
              {{{InputForm inputData=this}}}
            {{/each}}
          </div>

          <div class="form-center-actions">
            {{{Button label=formData.buttonLabel onClick=onClick}}}            
            <a href="{{formData.linkHref}}" class="action-link">{{formData.linkTitle}}</a>
            <a href="./pages/listChats-page" class="action-link">Перейти в чаты</a>
          </div>
    
        </form>
      </main>
    `;
    // <a href="{{formData.buttonHref}}" class="primary-btn">{{formData.buttonLabel}}</a>
    // {{{InputForm inputData=this}}}
    // return `<div>
    //           <h2>Вход</h2>
    //           {{{Button label='Авторизоваться' onClick=onClick}}}
    //         </div>
    // `;
  }
}

export default LoginPage;
