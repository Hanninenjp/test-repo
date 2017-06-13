import { AngularWsPage } from './app.po';

describe('angular-ws App', () => {
  let page: AngularWsPage;

  beforeEach(() => {
    page = new AngularWsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
