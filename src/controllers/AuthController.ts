import AuthAPI from '../api/AuthAPI';
import { SigninData, SignupData } from '../types/types';
import store from '../utils/Store';
import Router from '../utils/Router';
// import MessagesController from './MessagesController';

class AuthController {
  constructor(private api: AuthAPI) {}

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      store.set('user.error', undefined);
      Router.go('/settings');
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e);
      store.set('user.error', e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      store.set('user.error', undefined);
      Router.go('/settings');
    } catch (e: any) {
      store.set('user.error', e);

      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
  }

  async logout() {
    try {
      // MessagesController.closeAll();

      await this.api.logout();

      Router.go('/');
      store.set('user.error', undefined);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e.message);
      store.set('user.error', e);
    }
  }
}

export default new AuthController(new AuthAPI());
