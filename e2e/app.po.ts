import { browser, by, element, $, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppTitleText() {
    return $('app-root h1').getText();
  }

  getSearchInput() {
    return $('.search').$('input');
  }

  getSearchButton() {
    return $('.search').$('button');
  }

  getMinSalary() {
    return $('.min-block').$('.salary');
  }

  getMaxSalary() {
    return $('.max-block').$('.salary');
  }

  getAverageSalary() {
    return $('.average-block').$$('.block').last().$('.salary');
  }

  getMedianSalary() {
    return $('.average-block').$$('.block').first().$('.salary');
  }

  getAnalyticsBlock() {
    return $('.analytics');
  }

  getVacanciesCount() {
    return this.getAnalyticsBlock().$('p');
  }

  getVacanciesList() {
    return $('.list');
  }
}
