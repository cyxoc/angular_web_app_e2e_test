import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getJobTitle() {
    return element(by.css('.title')).getText() as Promise<string>;
  }

  getLocation() {
    return element(by.css('.location')).getText() as Promise<string>;
  }

  getApplyButton() {
    return element(by.css('button')).isPresent() as Promise<boolean>;
  }

  getRoleDescription() {
    return element(by.css('app-job h2')).getText() as Promise<string>;
  }

  getDesiredSkills() {
    return element(by.css('app-job h2:nth-of-type(2)')).getText() as Promise<string>;
  }

  getCareerOpportunity() {
    return element(by.css('app-job h2:nth-of-type(3)')).getText() as Promise<string>;
  }

  clickApplyButton() {
    return element(by.css('button')).click() as Promise<void>;
  }

  isResponsive() {
    return true; // Placeholder return value -- Actual logic TO DO
  }

  areLinksValid() {
    const links = element.all(by.css('a'));

   
    return links.each(async (link) => {
      const href = await link.getAttribute('href');

      if (!href || href.startsWith('javascript:')) {
        return false;
      }

      if (href.startsWith('#') && href.length === 1) {
        return false;
      }

      return true;
    });
  }

  getHeading1Text() {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getHeading2Text() {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  getJobListings() {
    return element.all(by.css('app-jobs ul li'));
  }

  getFirstJobListing() {
    return this.getJobListings().first();
  }
}
