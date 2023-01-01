import { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
// eslint-disable-next-line import/no-cycle
import MessagesController from './MessagesController';

class ChatsController {
  constructor(private api: ChatsAPI) {}

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
    await this.fetchChats();
  }

  async deleteUserToChat(id: number, userId: number) {
    this.api.deleteUsers(id, [userId]);
    await this.fetchChats();
  }

  async addAvatar(data: FormData) {
    try {
      const response = await this.api.addAvatar(data);

      // await this.fetchChats();

      return response;
    } catch (e: any) {
      store.set('chats.error', e);

      // eslint-disable-next-line no-console
      console.error(e);
      throw (e);
    }
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const chatsController = new ChatsController(new ChatsAPI());

export default chatsController;
