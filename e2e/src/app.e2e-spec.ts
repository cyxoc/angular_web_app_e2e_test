import { AppPage } from './app.po';
import { ApplyFormPage } from './apply-form.po';
import { browser, element, by, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getTitleText()).toEqual('galytix-test-exercise app is running!');
  });

  it('should display static text elements on the page', () => {
    expect(page.getHeading1Text()).toEqual('Browse Jobs');
    expect(page.getHeading2Text()).toEqual('Technology');
  });

  it('should display a list of job postings with titles, locations, and dates posted', () => {
    const jobListings = page.getJobListings();

    expect(jobListings.count()).toBeGreaterThan(0);

    jobListings.each(async (listing, index) => {
      const title = await listing.element(by.css('.title')).getText();
      const location = await listing.element(by.css('.location')).getText();
      const datePosted = await listing.element(by.css('.date')).getText();

      expect(title).toBeTruthy();
      expect(location).toBeTruthy();
      expect(datePosted).toBeTruthy();
    });
  });

  it('should navigate to the correct job details page when a job is clicked', async () => {
    const firstJobListing = page.getFirstJobListing();
    const jobTitle = await firstJobListing.element(by.css('.title')).getText();

    await firstJobListing.click();

    expect(await browser.getCurrentUrl()).toContain('/job'); 
    expect(await browser.getCurrentUrl()).toContain(jobTitle.toLowerCase().replace(/\s+/g, '-'));
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('workspace-project App', () => {
  let page: AppPage;

  it('should display job title, location, and apply button', async () => {
    await page.navigateTo();
    const firstJobListing = page.getFirstJobListing();
    await firstJobListing.click();
    expect(page.getJobTitle()).toBeTruthy();
    expect(page.getLocation()).toBeTruthy();
    expect(page.getApplyButton()).toBeTruthy();
  });

  it('should display detailed role description', async () => {
    expect(await page.getRoleDescription()).toBeTruthy();
  });

  it('should display desired skills', async () => {
    expect(await page.getDesiredSkills()).toBeTruthy();
  });

  it('should display career opportunity section', async () => {
    expect(await page.getCareerOpportunity()).toBeTruthy();
  });

  it('should navigate to apply page when apply button is clicked', async () => {
    await page.clickApplyButton();
    expect(await browser.getCurrentUrl()).toContain('/apply'); 
  });

  it('should have valid links', async () => {
    expect(await page.areLinksValid()).toBeTruthy();
  });



  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


describe('Apply Form', () => {
  let applyFormPage: ApplyFormPage;
  let page: AppPage;


  it('should display the apply form when "Apply Now" button is clicked', async () => {
    await page.navigateTo();
    const firstJobListing = page.getFirstJobListing();
    await firstJobListing.click();
    await page.clickApplyButton();
    expect(await applyFormPage.isFormDisplayed()).toBeTruthy();
  });

  it('should require all input fields to be filled before submitting', async () => {
  
    await applyFormPage.submitForm();
    expect(await applyFormPage.areFieldsRequired()).toBeTruthy();
  });

  it('should allow filling in the form and submitting successfully', async () => {
    
    await applyFormPage.fillForm('John Doe', 'john@example.com', './e2e/src/resume_assignment.pdf');
    await applyFormPage.submitForm();
    expect(await applyFormPage.areFieldsValid()).toBeTruthy();
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


