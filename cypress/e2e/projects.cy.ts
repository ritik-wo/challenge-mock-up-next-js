describe('Projects - Core flows', () => {
  beforeEach(() => {
    // Ensure a clean state between tests
    cy.clearLocalStorage('proplens-projects');
  });

  it('loads projects page with default projects and allows viewing details', () => {
    cy.visit('/projects');

    // Default cards should be present
    cy.contains('Existing Projects').should('be.visible');
    cy.contains('Skyline Towers').should('be.visible');
    cy.contains('Garden Residency').should('be.visible');

    // View details via ProjectCard action
    cy.contains('Skyline Towers')
      .closest('div')
      .closest('div.rounded-xl.border')
      .within(() => {
        cy.contains('button', 'View').click();
      });

    // Modal should open with details
    cy.get('[role="dialog"]').should('exist');
    cy.contains('button', 'Close').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('adds a new project through the form and then deletes it', () => {
    cy.visit('/projects');

    // Open the new project form
    cy.get('[data-testid="add-project"]').click();
    cy.get('[data-testid="new-project-form"]').should('be.visible');

    // Attempt submit with empty fields to exercise validation
    cy.get('[data-testid="new-project-form"]').within(() => {
      cy.get('button[type="submit"]').click();
    });

    // Fill the form
    cy.get('#project-name').type('Cypress Tower');
    cy.get('#project-url').type('https://example.com/cypress-tower');
    cy.get('#coordinates').type('19.076, 72.8777');

    // Save
    cy.get('[data-testid="new-project-form"]').within(() => {
      cy.get('button[type="submit"]').click();
    });

    // New card should appear on top
    cy.contains('Cypress Tower').should('be.visible');

    // Delete via card delete button
    cy.contains('Cypress Tower')
      .closest('div')
      .closest('div.rounded-xl.border')
      .within(() => {
        cy.contains('button', 'Delete').click();
      });

    // Confirm modal
    cy.get('[role="dialog"]').should('exist');
    cy.contains('button', /^Yes$/).click();

    // Ensure it is removed
    cy.contains('Cypress Tower').should('not.exist');
  });

  it('shows SharePoint input for brochures link', () => {
    cy.visit('/projects');
    cy.get('input[aria-label="SharePoint link"][placeholder="https://sharepoint.com/..."]').should('be.visible');
  });
});
