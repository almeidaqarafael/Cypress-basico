/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente - TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html');

  });
  
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
    
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.success')
      .should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  
    cy.get('#firstName')
    .type('João')
    .should('have.value', 'João');

  cy.get('#lastName')
    .type('Maria')
    .should('have.value', 'Maria');

    cy.get('#email')
      .type('testemail.com');
    
    cy.get('#open-text-area')
      .type('Teste');

    cy.contains('button', 'Enviar')
      .click();

    cy.get('.error')
      .should('be.visible');
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

    cy.contains('button', 'Enviar')
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
  cy.contains('button', 'Enviar')
    .click()
  cy.get('.error')
    .should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.enviaFormulario();
    cy.get('.success').should('be.visible');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube');
  }); 

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog');
  });  

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]')
      .last()
      .check()
      .should('have.value', 'feedback')
  });

  it('marca o tipo de atendimento "Elogio"', () => {
    cy.get('input[type="radio"][value="elogio"]')
      .last()
      .check()
      .should('have.value', 'elogio')
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
    });
  });
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').as('chekbox')
      .should('have.length', 2)
      .check()
      .should('be.checked')
      .last()
      .uncheck();

    cy.get('@chekbox')
      .first()
      .should('be.checked');

    cy.get('@chekbox')
      .last()
      .should('not.be.checked');
  });

})