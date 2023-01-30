import Block from '../../utils/Block';

interface ErrorLayoutProps {
  pageData?: {
    'numberError': string,
    'title': string,
    'linkTitle': string,
    'linkHref': string
  };
}

class ErrorLayout extends Block {
  constructor({ pageData }: ErrorLayoutProps) {
    super({
      pageData,
    });
  }

  static componentName = 'ErrorLayout';

  render() {
    /* html */
    return `
    <div class="title-center error-page">
      <h1>{{pageData.numberError}}</h1>
      <h2>{{pageData.title}}</h2>
      <a href="{{pageData.linkHref}}" class="action-link">{{pageData.linkTitle}}</a>
    </div>
    `;
  }
}

export default ErrorLayout;
