let account = require('../../fixtures/credentialData.json');


describe('Menus Leave - Apply', () => {
    let baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    let username = 'mahira';

    it('1. Employee login and Request Leave - Positive Case', () => {
        cy.visit(baseUrl);
        cy.xpath(`//input[@name='username']`).type(account.validCredentialEmployee.username);
        cy.xpath(`//input[@name='password']`).type(account.validCredentialEmployee.password);
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Dashboard').should('exist');

        cy.contains('Leave').click();
        cy.contains('Apply').click();
        cy.contains('Apply Leave').should('exist');

        cy.get('.oxd-select-text').first().click();
        cy.contains('CAN - Vacation').click();

        cy.xpath(`//input[@placeholder="yyyy-dd-mm"]`).first().click();
        cy.get('.oxd-calendar-date').contains('20').click();
        cy.xpath(`//input[@placeholder="yyyy-dd-mm"]`).eq(1).click();
        cy.get('.oxd-calendar-date').contains('22').click();

        cy.get('div.oxd-select-text').contains('-- Select --').click();
        cy.get('.oxd-select-dropdown .oxd-select-option').contains('All Days').click();
    
        cy.get('div.oxd-select-text').contains('-- Select --').click();
        cy.get('.oxd-select-dropdown .oxd-select-option').contains('Half Day - Morning').click();
        
        cy.get('textarea').type('ini hanya contoh data');
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Success').should('exist');

        cy.get('.oxd-userdropdown-tab').click();
        cy.contains('Logout').click();
        cy.get('[name="username"]').should('exist');

    });

    it('2. Admin Login and Approve leave employee by admin', () => {
        cy.visit(baseUrl);
        cy.xpath(`//input[@name='username']`).type(account.validCredential.username);
        cy.xpath(`//input[@name='password']`).type(account.validCredential.password);
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Dashboard').should('exist'); 

        cy.contains('Leave').click();
        cy.contains('Leave List').click();

        cy.get('.oxd-autocomplete-text-input input').type(username);
        cy.wait(1000);
        cy.contains('.oxd-autocomplete-option', username).click();

        cy.get('.oxd-button--label-success').click();
        cy.contains('Success').should('exist');

    });

    it('3. Employee Login and check leave to be approval', () => {
        cy.visit(baseUrl);
        cy.xpath(`//input[@name='username']`).type(account.validCredentialEmployee.username);
        cy.xpath(`//input[@name='password']`).type(account.validCredentialEmployee.password);
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Dashboard').should('exist');

        cy.contains('Leave').click();
        cy.contains('My Leave').click();
        cy.contains('My Leave List').should('exist');
    });

    it('Employee Apply Leave - Negative Case', () => {
        cy.visit(baseUrl);
        cy.xpath(`//input[@name='username']`).type(account.validCredentialEmployee.username);
        cy.xpath(`//input[@name='password']`).type(account.validCredentialEmployee.password);
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Dashboard').should('exist');
    
        cy.contains('Leave').click();
        cy.contains('Apply').click();
        cy.contains('Apply Leave').should('exist');
    
        cy.get('[type="submit"]').click();
        cy.contains('Required').should('exist');
      });
});