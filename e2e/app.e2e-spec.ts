import { AppPage } from './app.po';
import { protractor, browser } from 'protractor';

describe('Average Salary App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display "Average App" title', () => {
    expect(page.getAppTitleText()).toEqual('Average Salary');
  });

  it('should have serarch input and button', () => {
    expect(page.getSearchInput().isPresent()).toBeTruthy();
    expect(page.getSearchButton().isPresent()).toBeTruthy();
  });

  it('should not display analytics block before any search', () => {
    expect(page.getAnalyticsBlock().isPresent()).toBeFalsy();
  });

  it('search box should send request with Enter key', () => {
    page.getSearchInput().sendKeys('JavaScript', protractor.Key.ENTER);
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.getAnalyticsBlock()), 10000);
    expect(page.getAnalyticsBlock().isPresent()).toBe(true);
  });

  it('search box should send request with button', () => {
    page.getSearchInput().sendKeys('JavaScript');
    page.getSearchButton().click();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.getAnalyticsBlock()), 10000);
    expect(page.getAnalyticsBlock().isPresent()).toBeTruthy();
  });

  it('should find min, max, average, median, count, list for "Javascript" vacancies', () => {
    page.getSearchInput().sendKeys('JavaScript');
  });
});
