/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import produtoPage from '../support/page_objects/produto.page';

describe('Funcionalidade:/ Produtos', () => {
   
    beforeEach(() => {
     
       produtoPage.visitarUrl()
    
    });
    
    it('Deve selecionar um produto da lista', () => {
       console.log("passou aqui!!!")
        produtoPage.buscarProdutoLista('Aero Daily Fitness Tee')
 
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')
    });

    it('Deve adicionar um produto ao carrinho', () =>{
        produtoPage.buscarProduto('Ariel Roll Sleeve Sweatshirt')
        //produtoPage.addProdutoCarrinho('M', 'Red', qtd)
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(1)
        cy.get('.single_add_to_cart_button').click()
  
        cy.get('.woocommerce-message').should('contain', '“Ariel Roll Sleeve Sweatshirt” foi adicionado no seu carrinho.')
    });
    it.only('Compra na loja Ebac shop', () => {
        produtoPage.buscarProduto('Ajax Full-Zip Sweatshirt')
        produtoPage.addProdutoCarrinho('M', 'Green', 4)
        cy.get('.woocommerce-message').should('contain', '4 × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type('Rua 123teste')
        cy.get('#billing_city').type('Sao Paulo')
        cy.get('#billing_postcode').type('12345678')
        cy.get('#billing_phone').type('1234567890')
        cy.get('#billing_email').type(faker.internet.email())
        cy.get('#createaccount').click()
        cy.get('#account_password').type(faker.internet.password())
        cy.get('.woocommerce-password-strength').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-info > .showlogin').click()
        
    });
    
    
    // it('Deve visitar a pagina do carrinho', () => {
    //     cy.get('.woocommerce-message > .button').click()
    // });
});




// context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
//   /*  Como cliente 
//       Quero acessar a Loja EBAC 
//       Para fazer um pedido de 4 produtos 
//       Fazendo a escolha dos produtos
//       Adicionando ao carrinho
//       Preenchendo todas opções no checkout
//       E validando minha compra ao final */

//   beforeEach(() => {
//       cy.visit('/')
//   });

//   it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
//       //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      
//   });