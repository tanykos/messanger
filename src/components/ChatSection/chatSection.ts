import Block from '../../utils/Block';

interface ChatSectionProps {
  chatsData: {
    chatName: string,
    chatCounter: string,
    lastMessage: string,
    date: string
  };
  onClick?: () => void
}

class ChatSection extends Block {
  constructor({ chatsData, onClick }: ChatSectionProps) {
    super({
      chatName: chatsData.chatName,
      chatCounter: chatsData.chatCounter,
      lastMessage: chatsData.lastMessage,
      date: chatsData.date,
      events: {
        click: onClick,
      },
    });
  }

  static componentName = 'ChatSection';

  render() {
    /* html */
    return `
    <section class="chat-section">
      <a class="chat-link">
        <span class="chat-avatar"></span>
        <span class="chat-item">
          <div class="chat-item-row">
            <span class="chat-item-bold">{{chatName}}</span>
            <span class="chat-item-date">{{date}}</span>
          </div>
          <div class="chat-item-row">
            <span class="chat-item-message">{{lastMessage}}</span>
            {{#if chatCounter}}
              <span class="chat-counter">{{chatCounter}}</span>
            {{/if}}
          </div>
        </span>
      </a>
    </section>
    `;
  }
}

export default ChatSection;
