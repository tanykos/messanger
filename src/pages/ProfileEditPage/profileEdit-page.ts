import Block from '../../utils/Block';
import profileData from '../../data/profileData.json';
import modalData from '../../data/modalData.json';
import validateForm from '../../utils/validateForm';
import { withStore } from '../../utils/Store';
import UserController from '../../controllers/UserController';

class ProfileEditBase extends Block {
  constructor(props: any) {
    super({
      ...props,
      pageData: profileData['profile-edit'],
      inputsData: profileData['profile-edit-inputs'],
      actionsData: profileData['profile-edit-actions'],
      modalData: modalData.uploadAvatar,
      onSubmit: (e : Event) => this.onSubmit(e),
    });
  }

  onSubmit(e : Event) {
    const data = validateForm(e);
    if (data) {
      data.id = this.props.formData.id;
      UserController.update(data);
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
        {{{ProfileContent formData=formData
          pageData=pageData
          inputsData=inputsData
          actionsData=actionsData
          modalData=modalData
          formId="profileEditForm" 
          isAvatarEdit=true
          onSubmit=onSubmit}}}
      </div>
    </main>
    `;
  }
}

const ProfileEditPage = withStore((state) => ({ formData: { ...state.user } }))(ProfileEditBase);
export default ProfileEditPage;
