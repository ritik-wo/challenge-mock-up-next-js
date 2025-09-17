describe('Navigation', () => {
  it('redirects to /projects and navigates to /sop', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/projects');

    cy.get('[data-testid="nav-SOP & Policies"]').click();
    cy.location('pathname').should('eq', '/sop');

    cy.get('[data-testid="nav-Our projects"]').click();
    cy.location('pathname').should('eq', '/projects');
  });
});
