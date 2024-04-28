import { browser, by, element } from 'protractor';

export class ApplyFormPage {

    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getNameInput() {
        return element(by.css('input[name="name"]'));
    }

    getEmailInput() {
        return element(by.css('input[name="email"]'));
    }

    getResumeInput() {
        return element(by.css('input[name="resume"]'));
    }

    getSubmitButton() {
        return element(by.css('button[type="submit"]'));
    }

    // Fill form with provided data
    async fillForm(name: string, email: string, resumePath: string) {
        await this.getNameInput().sendKeys(name);
        await this.getEmailInput().sendKeys(email);
        await this.getResumeInput().sendKeys(resumePath);
    }

    // Submit the form
    async submitForm() {
        await this.getSubmitButton().click();
    }

    // Check if form is displayed
    async isFormDisplayed() {
        return await element(by.css('.applyNowForm')).isDisplayed();
    }

    // Check if form fields are required
    async areFieldsRequired() {
        return await this.getNameInput().getAttribute('required') &&
            await this.getEmailInput().getAttribute('required') &&
            await this.getResumeInput().getAttribute('required');
    }

    // Check if form fields are valid
    async areFieldsValid() {
        const isNameValid = await this.getNameInput().getAttribute('class').then(classes => classes.includes('ng-valid'));
        const isEmailValid = await this.getEmailInput().getAttribute('class').then(classes => classes.includes('ng-valid'));
        const isResumeValid = await this.getResumeInput().getAttribute('class').then(classes => classes.includes('ng-valid'));

        return isNameValid && isEmailValid && isResumeValid;
    }

}
