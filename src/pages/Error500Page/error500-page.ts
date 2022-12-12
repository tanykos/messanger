import Block from '../../utils/Block';
import errorData from '../../data/errorData.json';

class Error500Page extends Block {
  constructor() {
    super({
      pageData: errorData.error500,
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

export default Error500Page;
