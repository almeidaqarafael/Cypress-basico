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

  it('selecione um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(res => {
        expect(res[0].files[0].name).to.be.equal('example.json')
      });  
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(res => {
        expect(res[0].files[0].name).to.be.equal('example.json')
      });  
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('doc');
    
    cy.get('input[type="file"]')
      .selectFile('@doc')
      .then(res => {
        expect(res[0].files[0].name).to.be.equal('example.json')
      }); 
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