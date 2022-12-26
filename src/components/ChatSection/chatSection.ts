import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';

interface ChatSectionProps {
  chatsData: any;
  onClick?: () => void
}

class ChatSection extends Block {
  constructor({ chatsData, onClick }: ChatSectionProps) {
    super({
      ...chatsData,
      events: {
        click: (e : Event) => this.onClick(e),
      },
    });
  }

  static componentName = 'ChatSection';

  onClick(e: Event) {
    e.preventDefault();
    console.log('Chat is clicked', this.props.id);
    ChatsController.selectChat(this.props.id);
  }

  render() {
    console.log('!!!!!!!!!!!!!', this.props.id);
    /* html */
    return `
    <section class="chat-section">
      <a class="chat-link" id=${this.props.id}>
        <span class="chat-avatar"></span>
        <span class="chat-item">
          <div class="chat-item-row">
            <span class="chat-item-bold">{{title}}</span>
            <span class="chat-item-date">{{date}}</span>
          </div>
          <div class="chat-item-row">
            <span class="chat-item-message">{{last_message}}</span>
            {{#if unread_count}}
              <span class="chat-counter">{{unread_count}}</span>
            {{/if}}
          </div>
        </span>
      </a>
    </section>
    `;
  }
}

export default ChatSection;
