import Block from '../../utils/Block';

interface ProfileContentProps {
  pageData: string;
  inputsData: string;
  actionsData: string;
}

class ProfileContent extends Block {
  constructor({ pageData, inputsData, actionsData }: ProfileContentProps) {
    super({
      pageData,
      inputsData,
      actionsData,
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
    
      <form>
        <div class="profile-content">
          {{#each inputsData}}
            {{{InputInline inputsData=this isEdit=../pageData.isEdit}}}
          {{/each}}
        </div>
      
        <div class="profile-actions">
          {{#each actionsData}}
            <div class="actions-item">
              <a href="{{this.linkHref}}" class="{{this.link-class}}">{{this.link-title}}</a>
            </div> 
          {{/each}}
        </div>
      </form>
        
    </div>
    `;
  }
}

export default ProfileContent;
