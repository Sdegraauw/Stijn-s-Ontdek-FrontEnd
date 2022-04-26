/// <reference types="Cypress" />

describe("Log in page", () => {
        
    it("should login", () => {
        
        const User = {
            email: "admin@gmail.com",
            password: "admin"
        }

         cy.fixture('user_mock_data').then(function(data)
        {
            this.data=data;
        })

        cy.intercept("POST", "http://localhost:8082/api/Authentication/login", {}).as("tryLogin");
        cy.visit("/login");

        cy.get('#email').type(User.email);
        cy.get('#password').type(User.password);

        cy.get('button').click();

        // cy.wait('@tryLogin').then(({response}) => {
        //     expect(response.statusCode).to.eq(500)

        cy.wait('@tryLogin').then((interception) => {
            const expectedValue = {
                email: this.data.email,
                password: this.data.password
            };
            expect(JSON.stringify(interception.request.body)).equal(
                JSON.stringify(expectedValue)
            );
        });


        //   cy.wait('@tryLogin').then(xhr => {
        //     expect(xhr.response.statusCode).to.equal(404);
        //   });
    });
});