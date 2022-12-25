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
    // ChatsController.fetchChats();
    console.log('Store in list', store);
    /* html */
    return `
    <main class="layout-col-2 layout-footer-stick">

      {{{ChatsList}}}
      
      <div class="layout-wrap">
        <div class="scroll-wrap">
          <div class="scroll-hidden">
            <header>
              <div class="row-items-3">
                <span class="item-1">
                  <span class="chat-avatar"></span>
                </span>
                <span class="item-2 text-bold">ChatName</span>
                <span class="item-3">
                  <button class="chat-avatar">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <div class="tooltip">Tooltip</div>
                </span>
              </div>
            </header>

            <div class="content-wrap">
              <div class="content-scroll">
                {{#each chatDetails}}
                  {{{ChatDetails chatDetails=this}}}
                {{/each}}                
              </div>
            </div>
          
            <footer>
              {{{TextareaForm onSubmit=onSubmit}}}
            </footer>
          </div>
        </div>
      </div>
      
    </main>
    `;
  }
}

export default ListChatsPage;

// <div class="main-content">
//         <h4 class="text-gray">Выберите чат, чтобы отправить сообщение</h4>
//       </div>

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
