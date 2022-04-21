it('Should POST the correct json', () => {
    const productName = chance.name();
    const catalogusNumber = chance.d10();
    const category = chance.d4();
    const productLocation = chance.sentence();
    const productDescription = chance.paragraph();
    const requiresApproval = chance.bool();

    cy.intercept('GET', '/api/product/lastcatalog', '9');
    cy.intercept('GET', '/api/category', [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }]);
    cy.intercept('POST', '/api/product', {}).as('addProductRequest');
    
    cy.visit('http://localhost:4200/products/add');
    
    cy.changeIsMenuOpened(false);
    
    cy.get("input[name=product-name-input]").type(productName);
    cy.get("input[name=catalog-number-input]").clear();
    cy.get("input[name=catalog-number-input]").type(catalogusNumber);
    cy.get('mat-select[name=category-id-select]').click().get('mat-option').contains(category).click();
    cy.get("input[name=product-location-input]").type(productLocation);
    cy.get("textarea[name=description-textarea]").type(productDescription);
    if (requiresApproval) {
        cy.get("mat-checkbox[name=requires-approval-checkbox]").click();
    }
    cy.get('button[name=save-product-button]').click();
    cy.wait('@addProductRequest').then((interception) => {
        const expectedValue = {
            categoryId: category,
            catalogNumber: catalogusNumber,
            description: productDescription,
            images: [],
            location: productLocation,
            name: productName,
            requiresApproval: requiresApproval
        };
        expect(JSON.stringify(interception.request.body)).equal(JSON.stringify(expectedValue));
    });
    cy.url().should('include', 'products/add');
    cy.get("snack-bar-container").should('have.class', 'success-snack');
});