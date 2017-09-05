import { IeCodeChallengePage } from './app.po';
import { browser, by } from 'protractor';

describe('ie-code-challenge App', () => {
  let page: IeCodeChallengePage;

  beforeEach(() => {
    page = new IeCodeChallengePage();
  });

  it('should have a map div', () => {
    page.navigateTo();
    expect(page.getMap().isDisplayed()).toBeTruthy();
  });

  it('should have a directions dialog div', () => {
    page.navigateTo();
    expect(page.getDirectionsDialog().isDisplayed()).toBeTruthy();
  });
});
