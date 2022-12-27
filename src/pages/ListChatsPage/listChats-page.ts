import Block from '../../utils/Block';
import chatsData from '../../data/chatsData.json';
import validateForm from '../../utils/validateForm';
import store from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';

class ListChatsPage extends Block {
  constructor() {
    super({
      chatDetails: chatsData.chatsList[0].chatDetails,
      onSubmit: (e : Event) => validateForm(e),
    });

    ChatsController.fetchChats();
  }

  render() {
    /* html */
    return `
    <main class="layout-col-2 layout-footer-stick">

      {{{ChatsList}}}

      {{{Messenger}}}
            
    </main>
    `;
  }
}

export default ListChatsPage;

// <a href="./profile-page" class="icon-link item-left">
//             Профиль
//             <i class="fa-solid fa-chevron-right"></i>
//           </a>

// +++++
// <div class="sidebar-chat">
//         <header>
// {{{Link label="Профиль" iconClass="fa-solid fa-chevron-right" to='/settings'
// className="action-link icon-link item-left"}}}

//           <form class="form-group has-search">
//             <span class="input-search-icon">
//               <span class="fa fa-search"></span>
//             </span>
//             <input type="text" class="input-search" placeholder="Поиск">
//           </form>
//         </header>

//         {{#each chatsData}}
//           {{{ChatSection chatsData=this}}}
//         {{/each}}

//       </div>
