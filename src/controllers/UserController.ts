import UserAPI from '../api/UserAPI';
import { User, UserPassword, Avatar } from '../types/types';
import store from '../utils/Store';
import Router from '../utils/Router';
import AuthController from './AuthController';

class UserController {
  constructor(private api: UserAPI) {}

  async update(data: User) {
    try {
      console.log('controller-data', data);
      await this.api.updateUser(data);

      // await this.fetchUser(data.id);

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
      console.log('controller-pass', data);
      await this.api.updatePassword(data);

      store.set('user.error', undefined);
      Router.go('/settings');
    } catch (e: any) {
      store.set('user.error', e);

      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  }

  async updateAvatar(data: FormData, id: number) {
    try {
      console.log('controller-avatar', data);
      const response = await this.api.updateAvatar(data);

      await AuthController.fetchUser();
      // await this.fetchUser(id);

      // store.set('user.error', undefined);
      return response;
      // Router.go('/profile');
    } catch (e: any) {
      store.set('user.error', e);

      // eslint-disable-next-line no-console
      console.error(e.message);
      throw (e);
    }
  }

  // async fetchUser(id: number) {
  //   const user = await this.api.getUser(id);
  //   console.log('user-control', user);
  //   store.set('user', user);
  // }
}

export default new UserController(new UserAPI());
