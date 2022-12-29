import MessagesController from '../../controllers/MessagesController';
import Block from '../../utils/Block';
import validateField from '../../utils/validateField';
import validateForm from '../../utils/validateForm';

interface TextareaFormProps {
  selectedChat: number;
  onSubmit?: () => void;
}

class TextareaForm extends Block {
  constructor(props: TextareaFormProps) {
    super({
      ...props,
      events: {
        submit: (e : Event) => this.onSubmit(e),
        focusin: (e : Event) => validateField(e.target as Element, 'message'),
        focusout: (e : Event) => validateField(e.target as Element, 'message'),
      },
    });
  }

  static componentName = 'TextareaForm';

  onSubmit(e: Event) {
    e.stopPropagation();

    const data = validateForm(e);
    if (data) {
      MessagesController.sendMessage(this.props.selectedChat!, data.message);
    }
  }

  render() {
    /* html */
    return `
    <form id="messageForm" novalidate>
      <div class="row-items-3">
        <span class="item-2">
          <textarea name="message"
            class="chat-textarea" 
            data-variant="filled" 
            data-autosize="true" 
            autocomplete="off" 
            placeholder="Сообщение"  
            style="height: 36px;"></textarea>
            <span id="message" class="error" aria-live="polite">Введите сообщение</span>
        </span>
        <span class="item-3">
          {{{Button isIconBtn=true}}}
        </span>
      </div>
    </form>
    `;
  }
}

export default TextareaForm;

// <span class="item-1">
//           <button role="button" type="button" class="icon-btn">
//             <i class="fa-solid fa-paperclip"></i>
//           </button>
//         </span>
