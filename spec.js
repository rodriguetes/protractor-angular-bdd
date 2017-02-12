/**
 * @file spec.js
 */

var Helper = require('./helpers/helper.js');
var RegisterUserPage = require('./page-objects/registerUser.po.js');
var Product = require('./page-objects/product.po.js');
var Cart = require('./page-objects/cart.po.js');

browser.ignoreSynchronization = true;

describe('Pre Compra - Lojas Americanas', function() {
    beforeEach(function() {
        browser.sleep(1000);

    });

    it('Informar Dados Cadastrais', function(done) {

        //Arrange
        Helper.get("http://www.americanas.com.br");

        //Act
        RegisterUserPage.clickModalRegisterNewUser(); //Clica para cadastrar na modal
        Helper.waitForPageUrlContains('cadastro'); //Aguarda a pagina de cadastro
        RegisterUserPage.fillFormRegisterNewUser(RegisterUserPage.getEmailRandom(), "123456", "carlito", "masculino", RegisterUserPage.getCPF(), "18/04/1986", "3432138311", "34988752210", "38400668", "100", "Referencia teste");
        Helper.waitForPageUrlContains('account'); //Aguarda a pagina de dados cadastrado

        //Assert
        expect(RegisterUserPage.dontHaveRecentsOrders()); //Validar se nao possui pedidos recentes
        browser.sleep(1000);
        expect(RegisterUserPage.addressAfterRegistered.get(1).getText()).toContain(RegisterUserPage.addressValue); //Valida se e endereco informado é o cadastrado
        expect(element(by.buttonText('Ver todos os pedidos'))); //Valida se existe o botao ver todos os pedidos
        browser.sleep(1000);
        expect($$('strong.user-name').get(1).getText()).toBe(RegisterUserPage.nameValue); //Valida se nome do usuario corresponde ao mesmo que foi cadastrado

        done();
    });

    it('Selecionar Comprar', function(done) {

        //Arrange
        Product.returnIndex();
        // Helper.get("http://www.americanas.com.br");

        //Act
        Helper.waitForPageUrlContains('americanas.com.br');
        Product.searchProduct('fifa 17 ps4');
        Product.clickProduct();
        Helper.waitForPageUrlContains('produto');

        //Assert
        //Valida se o produto selecionado é o mesmo da pagina de produto
        expect(Product.nameProductEnd.getText()).toBe(Product.nameProductStore);
        expect(Product.priceProductEnd.getText()).toBe(Product.priceProductStore);

        //Valida se os elementos principais contidos na página
        expect(element(by.id('bt-buy-product')).isPresent()).toBe(true); //Valida se existe o botao de comprar
        expect(element(by.cssContainingText('.card-info h2', 'Informações do produto'))); //Valide se existe a descricao do produto
        browser.sleep(1000);
        expect($('#reviews').isPresent()).toBeTruthy(); //Verifica se existe as avaliações do produto

        done();
    });


    it('Realizar Compra', function(done) {

        //Helper.get("http://www.americanas.com.br/produto/128926777/game-fifa-17-xbox-360?condition=NEW");
        //Arrange
        Helper.waitForPageUrlContains('produto');

        //Act
        Cart.addProductToCart(); //Adiciona produto no carrinho

        //Assert
        expect(Helper.waitForPageUrlContains('simple-basket')); //Valida que o usuário esta na tela do carrinho
        expect(Cart.elementHeadingBasket.isPresent()).toBe(true); //Verifica se existe a estrutura do elemento de Cesta
        expect(Cart.validElementsCart()); //Valida se existem os label da Heading da Cesta

        done();
    });

    it('Preencher o CEP em Minha Cesta', function(done) {

        //Arrange
        Helper.waitForPageUrlContains('simple-basket')

        expect(Cart.nameProduct.getText()).toBe(Product.nameProductStore); //Valida se é o produto escolhido
        expect(Cart.quantity.getAttribute('value')).toEqual('1'); //Valida a quantidade
        expect(Cart.unitaryValue.getText()).toBe(Product.priceProductStore); //Valida o preço do produto unitário
        expect(Cart.totalValue.getText()).toBe(Product.priceProductStore); //Valida o valor total do produto

        //Act
        Cart.setCepAndClick('38400668'); //Coloca cep no input e clica no botao calcular 
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($('.basket-freight-menu')), 500); //Verifica se apareceu as opções de frete
        var typeFreigth = 'Econômica';
        Cart.selectTypeFreigth(typeFreigth); //Seleciona o tipo de frete (Econômica ou Rápida)

        //Assert
        expect(element(by.cssContainingText('.table-summary-basket', typeFreigth))); //Valide o tipo de frete Escolhido
        expect(Cart.compareTotalProductMoreFreight()); //Valida se valor dos produtos + frete é igual valor total

        done();
    });

});