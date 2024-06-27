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

    cy.clock()
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
    
    cy.tick(3000)
    cy.get('.success')
      .should('not.be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  cy.clock()
    
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

  cy.tick(3000)

  cy.get('.error')
    .should('not.be.visible');
  });

  it('valida campo de telefone', () => {
    cy.get('#phone')
      .type('testando o campo')
      .should('have.value', '')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

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

    cy.tick(3000)

    cy.get('.error')
      .should('not.be.visible')
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
  cy.clock()

  cy.contains('button', 'Enviar')
    .click()
  cy.get('.error')
    .should('be.visible')

  cy.tick(3000)
  cy.get('.error')
    .should('not.be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.enviaFormulario();
    cy.get('.success').should('be.visible');
    cy.tick(3000)
    cy.get('.success').should('not.be.visible');
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

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  });

  it('preenche a área de texto usando o comando invoke', () => {
    const textoLongo = Cypress._.repeat('abcdefghij,', 20)

    cy.get('#open-text-area')
      .invoke('val', textoLongo)
      .should('be.visible', textoLongo)
  });

  it('faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    }).should((res) => {
      const {status, statusText, body } = res
      
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
  })
  });

})