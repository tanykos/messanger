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
// import ChatsController from './controllers/ChatsController';

enum Routes {
  Index = '/',
  Register = '/signup',
  Settings = '/settings',
  Profile = '/profile',
  Password = '/password',
  Chat = '/messenger',
  Error404 = '/error404',
  Error500 = '/error500',
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

  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Profile, ProfileEditPage)
    .use(Routes.Password, ProfilePasswordPage)
    .use(Routes.Chat, ListChatsPage)
    .use(Routes.Error404, Error404Page)
    .use(Routes.Error500, Error500Page);

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Chat);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
