import UserAPI from '../api/UserAPI';
import { User, UserPassword } from '../types/types';
import store from '../utils/Store';
import Router from '../utils/Router';

class UserController {
  constructor(private api: UserAPI) {}

  async update(data: User) {
    try {
      console.log('controller-data', data);
      await this.api.updateUser(data);

      await this.fetchUser(data.id);

      store.set('user.error', undefined);
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

  async fetchUser(id: number) {
    const user = await this.api.getUser(id);

    store.set('user', user);
  }
}

export default new UserController(new UserAPI());
