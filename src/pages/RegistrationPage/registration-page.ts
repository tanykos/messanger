// import InputForm from '../../components/InputForm';
// import Button from '../../components/Button';
import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
// import template from './login.hbs';

class RegistrationPage extends Block {
  constructor() {
    super({
      onClick: () => console.log('Clicked'),
      formData: formsData['registration-form'],
      formInputs: fieldsData['registration-form'],
    });
  }

  render() {
    /* html */
    return `
      <main class="items-center">
        <form class="form-center">
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
  }
}

export default RegistrationPage;
