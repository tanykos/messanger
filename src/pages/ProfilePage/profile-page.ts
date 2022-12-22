import Block from '../../utils/Block';
import profileData from '../../data/profileData.json';
import { withUser } from '../../utils/Store';

class ProfilePageBase extends Block {
  constructor(props: any) {
    super({
      formData: props,
      pageData: profileData.profile,
      inputsData: profileData['profile-inputs'],
      actionsData: profileData['profile-actions'],
    });
  }

  render() {
    // console.log('formData0: ', this.props.formData);
    /* html */
    return `
    <main class="layout-col-2">
      <div class="side-content">
        {{{Link iconClass="fa-solid fa-circle-arrow-left icon-primary" to='/messenger' className="icon-link"}}}
      </div>

      <div class="main-content">
        {{{ProfileContent formData=formData
          pageData=pageData
          inputsData=inputsData
          actionsData=actionsData}}}
      </div>
    </main>
    `;
  }
}

const ProfilePage = withUser(ProfilePageBase);
export default ProfilePage;
