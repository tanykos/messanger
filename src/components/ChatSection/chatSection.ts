import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { addClass } from '../../utils/helpers';

interface ChatSectionProps {
  chatsData: any;
  onClick?: () => void
}

class ChatSection extends Block {
  constructor({ chatsData }: ChatSectionProps) {
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
    addClass(this.props.id);
    ChatsController.selectChat(this.props.id);
  }

  render() {
    /* html */
    return `
    <section class="chat-section">
      <a class="chat-link" id=${this.props.id}>
        <span class="chat-avatar"></span>
        <span class="chat-item">
          <div class="chat-item-row">
            <span class="chat-item-bold">{{title}}</span>
            <span class="chat-item-date">{{time}}</span>
          </div>
          <div class="chat-item-row">
            <span class="chat-item-message">{{last_message.content}}</span>
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
