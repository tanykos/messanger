import Block from '../../utils/Block';
import profileData from '../../data/profileData.json';

class ProfilePage extends Block {
  constructor() {
    super({
      onClick: () => console.log('Clicked'),
      pageData: profileData.profile,
      inputsData: profileData['profile-inputs'],
      actionsData: profileData['profile-actions'],
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
          actionsData=actionsData}}}
      </div>
    </main>
    `;
  }
}

export default ProfilePage;
