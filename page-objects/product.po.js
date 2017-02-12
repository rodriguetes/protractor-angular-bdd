/**
 * @file product.po.js
 */
var EC = protractor.ExpectedConditions;

var ProductPage = function() {

    this.linkLogo = element(by.className('navbar-logo'));
    this.searchInput = element(by.id('h_search-input'));
    this.linkRegisterUser = element(by.css('.usr-signup'));

    this.product = $$('.as-lst-it').get(0);
    this.firstProductName = $$('.as-lst-it').get(0).$('.as-name');
    this.firstProcuctPrice = $$('.as-lst-it').get(0).$('.as-price')

    this.nameProductStore;
    this.priceProductStore;

    this.nameProductEnd = element(by.className('product-name'));
    this.priceProductEnd = element(by.className('sales-price'));

    this.searchProduct = function(product) {
        this.searchInput.sendKeys(product);
        browser.sleep(5000);
    };

    this.clickProduct = function() {
        browser.wait(EC.visibilityOf($('.src-box')), 2000);

        this.nameProductStore = this.firstProductName.getText().then(function(text) {
            return text;
        });

        this.priceProductStore = this.firstProcuctPrice.getText().then(function(text) {
            return text;
        });

        this.product.click();
    };

    this.returnIndex = function() {
        browser.sleep(1000);
        this.linkLogo.click();
    };

};

module.exports = new ProductPage();