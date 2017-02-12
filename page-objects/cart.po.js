/**
 * @file cart.po.js
 */
var EC = protractor.ExpectedConditions;

var CartPage = function() {

    this.linkBuyProduct = element(by.id('bt-buy-product'));
    this.elementHeadingBasket = element(by.className('basket-heading'));

    this.labelBasketHeading = [];
    this.labelBasketHeadingProduto;
    this.labelBasketHeading['quantidade'];
    this.labelBasketHeading['entrega'];
    this.labelBasketHeading['valorUnitario'];
    this.labelBasketHeading['valorTortal'];

    this.nameProduct = element(by.css('.basket-item-description .media-body a'));
    this.quantity = element(by.css('.select__quantity'));
    this.unitaryValue = element(by.css('.basket-item-price.hidden-xs span'));
    this.totalValue = element(by.css('.basket-item-total'));

    this.cep = element(by.name('cep'));
    this.buttonCalculateCEP = element(by.id('calculate-freight-button'));
    this.elementBasketFreight = element(by.css('.basket-freight-menu'));
    this.freightRapida = element(by.cssContainingText('.basket-freight-menu', 'Rápida'));
    this.freightEconomica = element(by.cssContainingText('.basket-freight-menu', 'Econômica'));

    this.elementTotalProduct = element(by.id('basket-summary-subtotal'));
    this.elementFreight = $$('.table-summary-basket tr').get(1).$$('td').get(2);
    this.elementTotalAmount = element(by.id('total-amount'));

    this.valueTotalProduct;
    this.valueFreight;
    this.valueTotalAmount = 0.00;

    this.addProductToCart = function() {
        this.linkBuyProduct.click();
    };

    this.validElementsCart = function() {
        $$('.basket-heading li').each(function(element, index) {
            // Will print 0 First, 1 Second, 2 Third.
            element.getText().then(function(text) {
                (index == 0) ? expect(text).toEqual('Produto(s)'): undefined;
                (index == 1) ? expect(text).toEqual('Quantidade'): undefined;
                (index == 2) ? expect(text).toEqual('Entrega'): undefined;
                (index == 3) ? expect(text).toEqual('Valor Unitário'): undefined;
                (index == 4) ? expect(text).toEqual('Valor Total'): undefined;
            });
        });
    };

    this.setCepAndClick = function(value) {
        browser.sleep(1000);
        this.cep.sendKeys(value);
        browser.sleep(1000);
        this.buttonCalculateCEP.click();
        browser.sleep(1000);
    };

    this.selectTypeFreigth = function(freigth) {
        element(by.cssContainingText('.basket-freight-menu', freigth)).click;

        browser.sleep(1000);

        this.restoreValuesTotalProductAndFreight();
    };

    this.restoreValuesTotalProductAndFreight = function() {

        this.valueTotalProduct = this.elementTotalProduct.getText().then(function(value) {
            return value;
        });

        this.valueFreight = this.elementFreight.getText().then(function(value) {
            return value;
        });

        // this.compareTotalProductMoreFreight();

    };

    this.compareTotalProductMoreFreight = function() {

        //Pega os valores em tela (produtos, frete e total)
        var product = this.elementTotalProduct.getText(),
            freight = this.elementFreight.getText(),
            total = this.elementTotalAmount.getText();

        protractor.promise.all([product, freight, total]).then(function(values) {

            //Substitui virgula pelo ponto
            var product = values[0].replace(",", ".");
            var freight = values[1].replace(",", ".");
            var total = values[2].replace(",", ".");

            //Transforma valores em Decimais e faz a soma dos produtos + frete 
            var sum = parseFloat(product) + parseFloat(freight);
            var sum = sum.toFixed(2);

            //transforma o valor em string e compara com o elemento total na tela que esta em string
            expect(sum.toString()).toEqual(total);
        });

    };



};

module.exports = new CartPage();