import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import AuthController from '../../controllers/AuthController';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  logoutLink?: boolean;
  className?: string;
  iconClass?: string;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.onClickFunc(),
      },
    });
  }

  logout = () => {
    AuthController.logout();
  };

  navigate = () => {
    this.props.router.go(this.props.to);
  };

  onClickFunc = this.props.logoutLink ? this.logout : this.navigate;

  static componentName = 'Link';

  render() {
    /* html */
    return `
    <span class="{{className}} {{#if logoutLink}}red{{/if}}">
      {{#if label}}
        {{ label }}
      {{/if}}
      
      {{#if iconClass}}
        <i class="{{iconClass}}"></i>
      {{/if}}
    </span>
    `;
  }
}

const Link = withRouter(BaseLink);
export default Link;
