import Block from '../../utils/Block';
import { parsDate } from '../../utils/helpers';

interface ChatMessageProps {
  userId: number,
  message: {
    content: string,
    time: string,
    user_id: number,
    type: string,
  }
}

class ChatMessage extends Block {
  constructor({ userId, message }: ChatMessageProps) {
    super({
      userId,
      messageText: message.content,
      messageTime: message.time,
      messageAuthor: message.user_id,
      type: message.type,
    });
  }

  static componentName = 'ChatMessage';

  render() {
    const date = parsDate(this.props.messageTime).day;
    const { time } = parsDate(this.props.messageTime);
    const isInfo = (this.props.type === 'user connected');
    const isMine = (this.props.messageAuthor === this.props.userId);
    /* html */
    return `
      {{#if ${isInfo} }}
        <p class="info-text">{{messageText}} user connected</p>
      {{else}}
        <div class="message {{#if ${isMine}}}message-user{{/if}}" >
          <p class="message-text">{{messageText}}</p>
          <p class="message-time">
            <span>${date}</span>
            <span>${time}</span>
          </p>
        </div>
        {{/if}}
    `;
  }
}

export default ChatMessage;
