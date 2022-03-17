it('works', () => {
  cy.visit('/');
  cy.contains('hey').should('be.visible');
});
