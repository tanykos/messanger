import renderDOM from './utils/renderDOM';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/RegistrationPage';
import ListChatsPage from './pages/ListChatsPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfilePasswordPage from './pages/ProfilePasswordPage';
import Error404Page from './pages/Error404Page';
import Error500Page from './pages/Error500Page';
import Button from './components/Button';
import InputForm from './components/InputForm';
import Avatar from './components/Avatar';
import ProfileContent from './components/ProfileContent';
import Modal from './components/Modal';
import InputInline from './components/InputInline';
import ErrorLayout from './components/ErrorLayout';
import ChatSection from './components/ChatSection';
import Popup from './components/Popup';
import ChatDetails from './components/ChatDetails';
import ChatMessage from './components/ChatMessage';
import Form from './components/Form';
import TextareaForm from './components/TextareaForm';
import Link from './components/Link';
import ButtonClose from './components/ButtonClose';
import FormUpload from './components/FormUpload';
import ChatsList from './components/ChatsList';
import Messenger from './components/Messenger';
import ModalOpenLink from './components/ModalOpenLink';
import ModalChats from './components/ModalChats';
import DropdownBtn from './components/DropdownBtn';
import registerComponent from './utils/registerComponent';

import Router from './utils/Router';
import AuthController from './controllers/AuthController';
import './controllers/MessagesController';

enum Routes {
  Index = '/',
  Register = '/signup',
  Settings = '/settings',
  Profile = '/profile',
  Password = '/password',
  Chat = '/messenger',
}

document.addEventListener('DOMContentLoaded', async () => {
  registerComponent(Button);
  registerComponent(InputForm);
  registerComponent(Avatar);
  registerComponent(ProfileContent);
  registerComponent(Modal);
  registerComponent(InputInline);
  registerComponent(ErrorLayout);
  registerComponent(ChatSection);
  registerComponent(Popup);
  registerComponent(ChatDetails);
  registerComponent(ChatMessage);
  registerComponent(Form);
  registerComponent(TextareaForm);
  registerComponent(Link);
  registerComponent(ButtonClose);
  registerComponent(FormUpload);
  registerComponent(ChatsList);
  registerComponent(ModalOpenLink);
  registerComponent(ModalChats);
  registerComponent(Messenger);
  registerComponent(DropdownBtn);

  // const loginPage = new LoginPage();
  // const registrationPage = new RegistrationPage();
  // const listChatsPage = new ListChatsPage();
  // const profilePage = new ProfilePage();
  // const profileEditPage = new ProfileEditPage();
  // const profilePasswordPage = new ProfilePasswordPage();
  // const error404Page = new Error404Page();
  // const error500Page = new Error500Page();

  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Profile, ProfileEditPage)
    .use(Routes.Password, ProfilePasswordPage)
    .use(Routes.Chat, ListChatsPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    default: break;
  }

  try {
    await AuthController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Settings);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

  // custom routing sprint-2
  // renderDOM('#app', loginPage);

  // const path = document.location.pathname;

  // switch (path) {
  //   case ('/pages/registration-page'):
  //     renderDOM('#app', registrationPage);
  //     break;
  //   case ('/pages/listChats-page'):
  //     renderDOM('#app', listChatsPage);
  //     break;
  //   case ('/pages/profile-page'):
  //     renderDOM('#app', profilePage);
  //     break;
  //   case ('/pages/profileEdit-page'):
  //     renderDOM('#app', profileEditPage);
  //     break;
  //   case ('/pages/profilePassword-page'):
  //     renderDOM('#app', profilePasswordPage);
  //     break;
  //   case ('/pages/error404-page'):
  //     renderDOM('#app', error404Page);
  //     break;
  //   case ('/pages/error500-page'):
  //     renderDOM('#app', error500Page);
  //     break;
  //   default:
  //     renderDOM('#app', loginPage);
  // }

  // Modal
  // const modal = document.getElementById('modal');
  // const span: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
  // const modalButtons = Array.from(document.querySelectorAll('.js-modal-btn'));

  // if (modalButtons) {
  //   modalButtons.forEach((item) => {
  //     item.addEventListener('click', (event) => {
  //       event.preventDefault();
  //     });
  //   });

  //   modalButtons.addEventListener('click', () => {
  //     modal!.style.display = 'block';
  //   });
  // Close the modal
  //   span.onclick = () => {
  //     modal!.style.display = 'none';
  //   };

  //   window.onclick = (event) => {
  //     if (event.target === modal) {
  //       modal!.style.display = 'none';
  //     }
  //   };
  // }
});
