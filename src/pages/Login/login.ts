import InputForm from '../../components/InputForm';
// import Button from '../../components/Button';
import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
// import template from './login.hbs';

class LoginPage extends Block {
  constructor(props: { buttonLabel: string }) {
    super({
      ...props,
      onClick: () => console.log('Clicked'),
      formData: formsData['login-form'],
      formInputs: fieldsData['login-form'],
    });
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <form class="form-center" action="./pages/listChats-page">
          <h1 class="title-center">{{formData.title}}</h1>

          <div class="form-center-content">
            {{#each formInputs}}
              {{{InputForm inputData=this}}}
            {{/each}}
          </div>

          <div class="form-center-actions">
            {{{Button label=formData.buttonLabel onClick=onClick}}}            
            <a href="{{formData.linkHref}}" class="action-link">{{formData.linkTitle}}</a>
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
