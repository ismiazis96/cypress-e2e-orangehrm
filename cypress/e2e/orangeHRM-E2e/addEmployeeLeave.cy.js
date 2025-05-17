

let account = require('../../fixtures/credentialData.json');

describe('Add Leave Entitlement', () => {
    let baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    let username = 'mahira';


    beforeEach(() => {
        cy.visit(baseUrl);
        cy.xpath(`//input[@name='username']`).type(account.validCredential.username);
        cy.xpath(`//input[@name='password']`).type(account.validCredential.password);
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Dashboard').should('exist');

        cy.contains('Leave').click();
        cy.contains('Entitlements').click();
        cy.contains('Add Entitlements').click();
    });

    it('1. Add Leave Employee - Positive Case', () => {
        
        cy.xpath(`//input[@placeholder="Type for hints..."]`).type(username);
        cy.wait(1000);
        cy.contains('.oxd-autocomplete-option', username).click();

        cy.get('.oxd-select-text').first().click();
        cy.contains('CAN - Vacation').click();

        cy.get('.oxd-input').eq(1).type('2');
        cy.get('[type="submit"]').click();
        cy.contains('button', 'Confirm').click();

        cy.contains('Success', { timeout: 10000 }).should('be.visible');
        cy.screenshot();

    });

    it('2. Add Leave Employee Invalid data - Negative Case', () => {
        cy.get('[type="submit"]').click();
        cy.contains('Required').should('exist');

    });
});

