import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { BaseLink as Link } from './link';

describe('Link', () => {
  let routerMock: any;
  let logoutFake: any;
  let BaseLink: any;

  beforeEach(() => {
    routerMock = {
      go: sinon.fake(),
    };
    logoutFake = sinon.fake();
    const module = proxyquire('./link', {
      '../../controllers/AuthController': {
        logout: logoutFake,
        '@noCallThru': true,
      },
    });

    BaseLink = module.BaseLink;
  });

  it('should call Router.go on click', () => {
    const instance = new Link({
      label: 'Click me',
      to: '/abc',
      router: routerMock as any,
    });
    const { element } = instance;

    element?.click();

    expect(routerMock.go.callCount).to.eq(1);
  });

  it('should call AuthController.logout on link click', () => {
    // arrange
    const link = new BaseLink({ logoutLink: true });
    const { element } = link;

    // act
    element?.click();

    // assert
    expect(logoutFake.callCount).to.eq(1);
  });
});
