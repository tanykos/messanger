import BaseAPI from './BaseAPI';
import { User, UserPassword } from '../types/types';

// Sending data to server and get answer
export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  create = undefined;

  read = undefined;

  getUser(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}`);
  }

  updateUser(data: User) {
    return this.http.put('/profile', data);
  }

  updatePassword(data: UserPassword) {
    return this.http.put('/password', data);
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  update = undefined;

  delete = undefined;
}
