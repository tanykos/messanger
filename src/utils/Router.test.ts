import { expect } from 'chai';
import sinon from 'sinon';

import Router from './Router';
import Block from './Block';

describe('Router', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
  let getContentFake: any;
  let BlockMock: typeof Block;

  beforeEach(() => {
    Router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();

    getContentFake = sinon.fake.returns(document.createElement('div'));

    BlockMock = class {
      getContent = getContentFake;
    } as unknown as typeof Block;
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('should .use return Router instance', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

  it('forward', () => {
    Router.forward();

    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('back', () => {
    Router.back();

    expect((window.history.back as any).callCount).to.eq(1);
  });

  it('should .start render a page', () => {
    Router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('should .go follow to path', () => {
    const { pathname } = window.location;
    Router
      .use('/', BlockMock)
      .go('/');

    expect(pathname).to.eq('/');
  });
});
