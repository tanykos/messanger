import Block from '../../utils/Block';
import profileData from '../../data/profileData.json';
import getFormValues from '../../utils/getFormValues';

class ProfileEditPage extends Block {
  constructor() {
    super({
      pageData: profileData['profile-edit'],
      inputsData: profileData['profile-edit-inputs'],
      actionsData: profileData['profile-edit-actions'],
      onSubmit: (e : Event) => getFormValues(e),
    });
  }

  render() {
    /* html */
    return `
    <main class="layout-col-2">
      <div class="side-content">
        <a href="./listChats-page" class="icon-link">
          <i class="fa-solid fa-circle-arrow-left icon-primary"></i>
        </a>
      </div>

      <div class="main-content">
        {{{ProfileContent pageData=pageData
          inputsData=inputsData
          actionsData=actionsData
          formId="profileEditForm" 
          onSubmit=onSubmit}}}
      </div>
    </main>
    `;
  }
}

export default ProfileEditPage;
