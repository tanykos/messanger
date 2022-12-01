import Block from '../../utils/Block';
import formsData from '../../data/formsData.json';
import fieldsData from '../../data/fieldsData.json';
import getFormValues from '../../utils/getFormValues';

class RegistrationPage extends Block {
  constructor() {
    super({
      formData: formsData['registration-form'],
      formInputs: fieldsData['registration-form'],
      onSubmit: (e : Event) => getFormValues(e),
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

// <form id="reg-form" class="form-center">
//           <h1 class="title-center">{{formData.title}}</h1>

//           <div class="form-center-content">
//             {{#each formInputs}}
//               {{{InputForm inputData=this}}}
//             {{/each}}
//           </div>

//           <div class="form-center-actions">
//             {{{Button label=formData.buttonLabel onClick=onSubmit}}}
//             <a href="{{formData.linkHref}}" class="action-link">{{formData.linkTitle}}</a>
//           </div>

//         </form>
