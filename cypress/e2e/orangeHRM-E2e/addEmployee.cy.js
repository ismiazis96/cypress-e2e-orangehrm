// import { includes } from "cypress/types/lodash";

let account = require('../../fixtures/credentialData.json')

describe('Menus employee', () =>  {
    
     let baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
     let firstname = 'mahira';
     let lastname = 'azis';
     //let username = 'ismiiazis'
     //let passwordAccount = 'ismiazis123';

     beforeEach(() => {
        cy.visit(baseUrl);
        cy.xpath(`//input[@name='username']`).type(account.validCredential.username);
        cy.xpath(`//input[@name='password']`).type(account.validCredential.password);
        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Dashboard').should('exist');

        cy.wait(1000);
        cy.contains('PIM').click();
        cy.contains('Add Employee').click();
     });

    it('1. add employee valid data- Positive Case', function () {
        
        cy.xpath(`//input[@name='firstName']`).type(firstname);
        cy.xpath(`//input[@name='lastName']`).type(lastname);

        cy.get('.oxd-switch-input').click();
        cy.get('.oxd-form-row').eq(2).find('input').eq(0).type(account.validCredentialEmployee.username);
        cy.xpath(`//input[@type='password']`).eq(0).type(account.validCredentialEmployee.password);
        cy.xpath(`//input[@type='password']`).eq(1).type(account.validCredentialEmployee.password);
        cy.xpath(`//button[@type='submit']`).click();

        cy.contains('Personal Details', { timeout: 10000 }).should('be.visible');
        cy.contains(`${firstname} ${lastname}`).should('be.visible');
        cy.screenshot();

    });

    it('2. add employee invalid datas - Negative Case', () => {

        cy.xpath(`//button[@type='submit']`).click();
        cy.contains('Required').should('exist');


    });
});