import Block from '../../utils/Block';
import errorData from '../../data/errorData.json';

class Error404Page extends Block {
  constructor() {
    super({
      pageData: errorData.error404,
    });
  }

  render() {
    /* html */
    return `
    <main>
      {{{ErrorLayout pageData=pageData}}}
    </main>
    `;
  }
}

export default Error404Page;
