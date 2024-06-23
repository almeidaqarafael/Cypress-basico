/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente - TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html');

  })
  
  it('verifica o título da aplicação', () => {

    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João');

    cy.get('#lastName')
      .type('Maria')
      .should('have.value', 'Maria');

    cy.get('#email')
      .type('joao@mail.com')
      .should('have.value', 'joao@mail.com');

    cy.get('#open-text-area')
      .type('testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,', { delay: 0})
      .should('have.value', 'testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,testando o campo de área de texto,');
    
    cy.get('button[type="submit"]')
      .click()
    cy.get('.success')
      .should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error')
      .should('be.visible')
  });

  it('valida campo de telefone', () => {
    cy.get('#phone')
      .type('testando o campo')
      .should('have.value', '')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João');

    cy.get('#lastName')
      .type('Maria')
      .should('have.value', 'Maria');

    cy.get('#email')
      .type('joao@mail.com')
      .should('have.value', 'joao@mail.com');

    cy.get('#phone-checkbox')
      .check();

    cy.get('#open-text-area')
      .type('testando o campo de área de texto')
      .should('have.value', 'testando o campo de área de texto');

    cy.get('button[type="submit"]')
      .click()
    cy.get('.error')
      .should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('João')
    .clear()
    .should('have.value', '');

  cy.get('#lastName')
    .type('Maria')
    .clear()
    .should('have.value', '');

  cy.get('#email')
    .type('joao@mail.com')
    .clear()
    .should('have.value', '');

  cy.get('#open-text-area')
    .type('testando o campo de área de texto')
    .clear()
    .should('have.value', '');

  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.get('button[type="submit"]')
    .click()
  cy.get('.error')
    .should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.enviaFormulario();
  })

})