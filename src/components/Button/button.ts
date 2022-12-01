import Block from '../../utils/Block';

interface ButtonProps {
  label?: string;
  isIconBtn?: boolean;
  onClick?: () => void
}

class Button extends Block {
  constructor({ label, isIconBtn, onClick }: ButtonProps) {
    super({
      label,
      isIconBtn,
      events: {
        click: onClick,
      },
    });
  }

  static componentName = 'Button';

  render() {
    /* html */
    return `
    {{#if isIconBtn}}
      <button type="submit" class="chat-avatar icon-btn"><i class="fa-solid fa-circle-arrow-right icon-primary"></i></button>
    {{else}}
      <button type="submit" class="primary-btn">{{label}}</button>
    {{/if}}
    `;
  }
}

export default Button;

// <button class="chat-avatar icon-btn"><i class="fa-solid fa-circle-arrow-right icon-primary"></i></button>
