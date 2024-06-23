Cypress.Commands.add('enviaFormulario', () => {
  
  cy.get('#firstName').type('João')
  cy.get('#lastName').type('Maria')
  cy.get('#email').type('joao@mail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('button[type="submit"]').click()
  cy.get('.success').should('be.visible');
});