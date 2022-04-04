// import {mount} from '@cypress/react';
// import Dashboard from './../../Dashboard';

it('works', () => {
  cy.visit('http://localhost:19006/');
  cy.contains('hey').should('be.visible');
});

describe('Nav to Dashboard Screen', () => {
  it('Navigate to Dashboard', () => {
    cy.visit('http://localhost:19006/Dashboard');
    cy.get('div').contains('TO NEW ROUTE').click();
    cy.contains('Dashboard').should('be.visible');
  });
});

describe('Movies are shown', () => {
  it('movies are visible', () => {
    cy.get('[data-testid=movie]').should('have.length', 5);
  });
});
