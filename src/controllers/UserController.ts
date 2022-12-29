import UserAPI from '../api/UserAPI';
import { User, UserPassword } from '../types/types';
import store from '../utils/Store';
import Router from '../utils/Router';
import AuthController from './AuthController';

class UserController {
  constructor(private api: UserAPI) {}

  async update(data: User) {
    try {
      await this.api.updateUser(data);

      await AuthController.fetchUser();
      Router.go('/settings');
    } catch (e: any) {
      store.set('user.error', e);

      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  }

  async updatePassword(data: UserPassword) {
    try {
      await this.api.updatePassword(data);

      store.set('user.error', undefined);
      Router.go('/settings');
    } catch (e: any) {
      store.set('user.error', e);

      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const response = await this.api.updateAvatar(data);

      await AuthController.fetchUser();

      return response;
    } catch (e: any) {
      store.set('user.error', e);

      // eslint-disable-next-line no-console
      console.error(e.message);
      throw (e);
    }
  }
}

export default new UserController(new UserAPI());
