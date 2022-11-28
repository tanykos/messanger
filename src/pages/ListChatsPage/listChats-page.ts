import Block from '../../utils/Block';
import chatsData from '../../data/chatsData.json';

class ListChatsPage extends Block {
  constructor() {
    super({
      onClick: () => console.log('Clicked'),
      chatsData: chatsData.chatsList,
    });
  }

  render() {
    /* html */
    return `
    <main class="layout-col-2">
      <div class="sidebar-chat">
        <header>
          <a href="./listChats-page" class="icon-link item-left">
            Профиль
            <i class="fa-solid fa-chevron-right"></i>
          </a>

          <div class="form-group has-search">
            <span class="input-search-icon">
              <span class="fa fa-search"></span>
            </span>
            <input type="text" class="input-search" placeholder="Поиск">
          </div>
        </header>

        {{#each chatsData}}
          {{{ChatSection chatsData=this}}}
        {{/each}}
        
      </div>

      <div class="main-content">
        <h5>Выберите чат, чтобы отправить сообщение</h5>
      </div>
    </main>
    `;
  }
}

export default ListChatsPage;
