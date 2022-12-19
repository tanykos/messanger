import Block from '../../utils/Block';

interface ProfileContentProps {
  formData?: Record<string, unknown>;
  pageData: string;
  inputsData: string;
  actionsData: string;
  formId: string;
  onSubmit?: () => void;
}

class ProfileContent extends Block {
  constructor({
    formData, pageData, inputsData, actionsData, formId, onSubmit,
  }: ProfileContentProps) {
    super({
      formData,
      pageData,
      inputsData,
      actionsData,
      formId,
      events: {
        submit: onSubmit,
      },
    });
  }

  static componentName = 'ProfileContent';

  render() {
    // console.log('formData1: ', this.props.formData);
    // console.log('inputsData: ', this.props.inputsData);
    /* html */
    return `
    <div class="profile-wrap">
      {{{Avatar}}}
    
      {{{Modal}}}
    
      <h1 class="title-center">{{formData.first_name}}</h1>

      <form id={{formId}} novalidate>
        <div class="profile-content">
          {{#each inputsData}}
            {{{InputInline inputsData=this formData=../formData isEdit=../pageData.isEdit}}}
          {{/each}}
        </div>
      
        <div class="profile-actions">
            {{#each actionsData}}
              <div class="actions-item">
                {{#if ../pageData.isEdit}}
                  {{{Button label=this.link-title}}}
                {{else}}
                  {{{Link label=this.link-title to=this.linkHref logoutLink=this.logoutLink className="action-link"}}}
                {{/if}}
              </div>
            {{/each}}
        </div>
      </form>
        
    </div>
    `;
  }
}

export default ProfileContent;

// <a href="{{this.linkHref}}" class="{{this.link-class}}">{{this.link-title}}</a>
