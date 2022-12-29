import BaseAPI from './BaseAPI';
import { User, UserPassword, Avatar } from '../types/types';

// export interface User {
//   id: number;
//   first_name: string;
//   second_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
//   avatar: string;
// }

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
