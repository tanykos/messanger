import Block from '../../utils/Block';
import chatsData from '../../data/chatsData.json';
import getFormValues from '../../utils/getFormValues';

class ListChatsPage extends Block {
  constructor() {
    super({
      chatsData: chatsData.chatsList,
      chatDetails: chatsData.chatsList[0].chatDetails,
      onSubmit: (e : Event) => getFormValues(e, 'messageForm'),
    });
  }

  render() {
    /* html */
    return `
    <main class="layout-col-2 layout-footer-stick">
      <div class="sidebar-chat">
        <header>
          <a href="./profile-page" class="icon-link item-left">
            Профиль
            <i class="fa-solid fa-chevron-right"></i>
          </a>

          <form class="form-group has-search">
            <span class="input-search-icon">
              <span class="fa fa-search"></span>
            </span>
            <input type="text" class="input-search" placeholder="Поиск">
          </form>
        </header>

        {{#each chatsData}}
          {{{ChatSection chatsData=this}}}
        {{/each}}
        
      </div>

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
              <form id="messageForm">
                <div class="row-items-3">
                  <span class="item-1">
                    <button role="button" class="icon-btn">
                      <i class="fa-solid fa-paperclip"></i>
                    </button>
                  </span>
                  <span class="item-2">
                    <textarea name="message"
                      class="chat-textarea" 
                      data-variant="filled" 
                      data-autosize="true" 
                      autocomplete="off" 
                      placeholder="Сообщение"  
                      style="height: 36px;"></textarea>
                  </span>
                  <span class="item-3">
                    {{{Button onClick=onSubmit isIconBtn=true}}}
                  </span>
                </div>
              </form>
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
