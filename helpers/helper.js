/**
 * @file helpers.js
 */
var EC = protractor.ExpectedConditions;

var Helper = function() {

    this.get = function(url) {
        browser.get(url);
    };

    this.waitForPageUrlContains = function(page) {
        // Waits for the URL to contain 'foo'.
        browser.wait(EC.urlContains(page), 8000);
    };

    this.cl = function(element) {
        element.getText().then(function(text) {
            console.log(text);

        });
    };

};

module.exports = new Helper();