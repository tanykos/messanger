import BaseAPI from './BaseAPI';
import { User, UserPassword } from '../types/types';

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
  // read(): Promise<User> {
  //   console.log('data in class AuthAPI - read');
  //   return this.http.get('');
  // }

  getUser(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}`);
  }

  updateUser(data: User) {
    return this.http.put('/profile', data);
  }

  updatePassword(data: UserPassword) {
    return this.http.put('/password', data);
  }

  update = undefined;

  delete = undefined;
}
