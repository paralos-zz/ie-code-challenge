import { browser, by, element } from 'protractor';

export class IeCodeChallengePage {
    navigateTo() {
        return browser.get('/');
    }

    getMap() {
        return element(by.id('map'));
    }

    getStartInput() {
        return element(by.id('start'));
    }

    getEndInput() {
        return element(by.id('end'));
    }

    getDirectionsDialog() {
        return element(by.id('directions-dialog'));
    }

    getFormSubmit() {
        return element(by.id('directions-form-submit-1'));
    }

    getDirectionsForm() {
        return element(by.className('directions-form'));
    }
}
