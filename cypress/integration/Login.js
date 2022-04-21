/// <reference types="Cypress" />

describe("Log in page", () => {
        
    it("testing input", () => {
        
        const User = {
            email: "admin@gmail.com",
            password: "admin"
        }



        cy.intercept('POST', '/login', {}).as('login');

        cy.wait('@login').then(xhr => {
            expect(xhr.response.statusCode).to.equal(404);
          });



        // cy.fixture('user_mock_data').then(function(data)
        // {
        //     this.data=data ;
        // })
       
        //cy.intercept('GET', '**/login', { fixture: 'user_mock_data' }).as('getUser');
        // cy.intercept('POST', '/login', {}).as('tryLogin');

        // cy.visit("login");
        // cy.get('#email').type(User.email);
        // cy.get('#password').type(User.password);
        
        // cy.get('button').click();
        // cy.wait('@tryLogin').then((interception) => {
        //     const expectedValue = {
        //         //fixture value
        //         email: User.email,
        //         password: User.password                
        //     };
        //     expect(JSON.stringify(interception.request.body)).equal(JSON.stringify(expectedValue));
        // });                     //data from post request

        // //cy.request('/login').its('status').should('include', '400')
    });
});