import Block from '../../utils/Block';

interface ChatDetailsProps {
  chatDetails: {
    chatDate: string,
    messages: { messageText: string, messageTime: string, isOwner: boolean }[]
  },
  onClick?: () => void
}

class ChatDetails extends Block {
  constructor({ chatDetails, onClick }: ChatDetailsProps) {
    super({
      messages: chatDetails.messages,
      date: chatDetails.chatDate,
      events: {
        click: onClick,
      },
    });
  }

  static componentName = 'ChatDetails';

  render() {
    /* html */
    return `
    <section class="chat-detail">
      <p class="chat-date title-center">{{date}}</p>
        {{#each messages}}
          {{{ChatMessage messages=this}}}
        {{/each}}
    </section>
    `;
  }
}

export default ChatDetails;
