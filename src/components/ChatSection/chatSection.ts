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
        click: onClick,
      },
    });
  }

  static componentName = 'ChatSection';

  render() {
    console.log('!!!!!!!!!!!!!', this.props);
    /* html */
    return `
    <section class="chat-section">
      <a class="chat-link">
        <span class="chat-avatar"></span>
        <span class="chat-item">
          <div class="chat-item-row">
            <span class="chat-item-bold">{{title}}</span>
            <span class="chat-item-date">{{date}}</span>
          </div>
          <div class="chat-item-row">
            <span class="chat-item-message">{{lastMessage}}</span>
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
