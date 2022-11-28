import Block from '../../utils/Block';
// import styles from './button.hbs';

interface ButtonProps {
  label: string;
  onClick?: () => void
}

class Button extends Block {
  constructor({ label, onClick }: ButtonProps) {
    super({
      label,
      events: {
        click: onClick,
      },
    });
  }

  static componentName = 'Button';

  render() {
    return '<button class="primary-btn" type="submit">{{label}}</button>';
  }
}

export default Button;
