import Block from '../../utils/Block';

interface ChatMessageProps {
  messages: {
    messageText: string,
    messageTime: string,
    isOwner: boolean
  },
  onClick?: () => void
}

class ChatMessage extends Block {
  constructor({ messages, onClick }: ChatMessageProps) {
    super({
      messageText: messages.messageText,
      messageTime: messages.messageTime,
      isOwner: messages.isOwner,
      events: {
        click: onClick,
      },
    });
  }

  static componentName = 'ChatMessage';

  render() {
    /* html */
    return `
      <div class="message {{#if isOwner}}message-user{{/if}}" >
        <p class="message-text">{{messageText}}</p>
        <p class="message-time">{{messageTime}}</p>
      </div>
    `;
  }
}

export default ChatMessage;
