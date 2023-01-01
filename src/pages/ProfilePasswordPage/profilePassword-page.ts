import Block from '../../utils/Block';
import profileData from '../../data/profileData.json';
import validateForm from '../../utils/validateForm';
import { withUser } from '../../utils/Store';
import UserController from '../../controllers/UserController';

class ProfilePasswordBase extends Block {
  constructor(props: any) {
    super({
      formData: props,
      pageData: profileData['profile-password'],
      inputsData: profileData['profile-password-inputs'],
      actionsData: profileData['profile-password-actions'],
      onSubmit: (e : Event) => this.onSubmit(e),
    });
  }

  onSubmit(e : Event) {
    const data = validateForm(e);
    if (data) {
      UserController.updatePassword(data);
    }
  }

  render() {
    /* html */
    return `
    <main class="layout-col-2">
      <div class="side-content">
        {{{Link iconClass="fa-solid fa-circle-arrow-left icon-primary" to='/settings' className="icon-link"}}}
      </div>

      <div class="main-content">
        {{{ProfileContent pageData=pageData formData=formData
          inputsData=inputsData
          actionsData=actionsData
          formId="passwordForm"
          onSubmit=onSubmit}}}
      </div>
    </main>
    `;
  }
}

const ProfilePasswordPage = withUser(ProfilePasswordBase);
export default ProfilePasswordPage;
