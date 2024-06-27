/// <reference types="Cypress" />

describe('Política de Privacidade', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');

  });
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  });
  
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.get('#title')
      .should('have.text', 'CAC TAT - Política de privacidade')
  });
  
  it('testa a página da política de privacidade de forma independente', () => {
  cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
  
    cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
      .should('be.visible')
    cy.contains('p', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
      .should('be.visible')
    cy.contains('p', 'No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
      .should('be.visible')
    cy.contains('p', 'Talking About Testing')
      .should('be.visible')
  });
})

