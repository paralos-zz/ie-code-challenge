import { IeDemoPage } from './app.po';

describe('ie-demo App', () => {
  let page: IeDemoPage;

  beforeEach(() => {
    page = new IeDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
