import Block from '../../utils/Block';

interface ProfileContentProps {
  pageData: string;
  inputsData: string;
  actionsData: string;
  formId: string;
  onSubmit?: () => void;
}

class ProfileContent extends Block {
  constructor({
    pageData, inputsData, actionsData, formId, onSubmit,
  }: ProfileContentProps) {
    super({
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
    /* html */
    return `
    <div class="profile-wrap">
      {{{Avatar}}}
    
      {{{Modal}}}
    
      <h1 class="title-center">{{pageData.user-name}}</h1>
    
      <form id={{formId}} novalidate>
        <div class="profile-content">
          {{#each inputsData}}
            {{{InputInline inputsData=this isEdit=../pageData.isEdit}}}
          {{/each}}
        </div>
      
        <div class="profile-actions">
            {{#each actionsData}}
              <div class="actions-item">
                {{#if ../pageData.isEdit}}
                  {{{Button label=this.link-title}}}
                {{else}}
                  <a href="{{this.linkHref}}" class="{{this.link-class}}">{{this.link-title}}</a>
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
