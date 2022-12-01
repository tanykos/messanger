import Block from '../../utils/Block';

interface TextareaFormProps {
  onSubmit?: () => void;
}

class TextareaForm extends Block {
  constructor({ onSubmit }: TextareaFormProps) {
    super({
      events: {
        submit: onSubmit,
      },
    });
  }

  static componentName = 'TextareaForm';

  render() {
    /* html */
    return `
    <form id="messageForm" novalidate>
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
          {{{Button isIconBtn=true}}}
        </span>
      </div>
    </form>
    `;
  }
}

export default TextareaForm;
