/**
 * @file registerUser.po.js
 */
var EC = protractor.ExpectedConditions;

var RegisterUserPage = function() {

    this.divRegistration = element(by.id('h_user'));
    this.linkRegisterUser = element(by.css('.usr-signup'));

    this.email = element(by.name('email'));
    this.password = element(by.name('password'));
    this.passwordRepeat = element(by.name('password_repeat'));
    this.name = element(by.name('name'));
    this.genreM = element(by.css("label[for='gender_male']"));
    this.genreF = element(by.css("label[for='gender_female']"));
    this.cpf = element(by.name('cpf'));
    this.birthday = element(by.name('birthday'));
    this.tel = element(by.name('tel'));
    this.cel = element(by.name('cel'));
    this.cep = element(by.name('cep'));
    this.number = element(by.name('number'));
    this.complement = element(by.name('complement'));
    this.reference = element(by.name('reference'));

    this.nameValue;
    this.addressValue;
    this.numberValue;
    this.complementValue;

    this.buttonRegisterNewUser = element(by.name('submit_button'));

    this.addressAfterRegistered = $$('.adress-name .truncate');

    this.getCPF = function() {
        var n1 = Math.round(Math.random() * 9);
        var n2 = Math.round(Math.random() * 9);
        var n3 = Math.round(Math.random() * 9);
        var n4 = Math.round(Math.random() * 9);
        var n5 = Math.round(Math.random() * 9);
        var n6 = Math.round(Math.random() * 9);
        var n7 = Math.round(Math.random() * 9);
        var n8 = Math.round(Math.random() * 9);
        var n9 = Math.round(Math.random() * 9);

        var aux = n1 * 10 + n2 * 9 + n3 * 8 + n4 * 7 + n5 * 6 + n6 * 5 + n7 * 4 + n8 * 3 + n9 * 2;
        aux = Math.round(aux - (Math.floor(aux / 11) * 11));
        var nv1 = aux < 2 ? 0 : 11 - aux;

        aux = n1 * 11 + n2 * 10 + n3 * 9 + n4 * 8 + n5 * 7 + n6 * 6 + n7 * 5 + n8 * 4 + n9 * 3 + nv1 * 2;
        aux = Math.round(aux - (Math.floor(aux / 11) * 11));
        var nv2 = aux < 2 ? 0 : 11 - aux;

        return "" + n1 + n2 + n3 + "." + n4 + n5 + n6 + "." + n7 + n8 + n9 + "-" + nv1 + nv2;
    };

    this.getEmailRandom = function() {
        return Math.random().toString(36).substring(2, 11) + '@domain.com';
    };

    this.clickModalRegisterNewUser = function() {
        this.divRegistration.click();
        browser.wait(EC.visibilityOf($('.usr-signup')), 500);
        this.linkRegisterUser.click();
    };

    this.fillFormRegisterNewUser = function(email, password, name, genre, cpf, birthday, tel, cel, cep, number, reference) {
        this.email.sendKeys(email);
        this.password.sendKeys(password);
        this.passwordRepeat.sendKeys(password);
        this.name.sendKeys(name);
        browser.driver.sleep(100);
        genre == "masculino" ? this.genreM.click() : this.genreF.click();
        browser.driver.sleep(100);
        this.cpf.sendKeys(cpf);
        this.birthday.sendKeys(birthday);
        this.tel.sendKeys(tel);
        this.cel.sendKeys(cel);
        this.cep.sendKeys(cep);

        browser.sleep(3000);

        this.number.sendKeys(number);
        this.reference.sendKeys(reference);

        this.storeAddressAndName();
        browser.driver.sleep(100);

        this.buttonRegisterNewUser.click();

    };

    this.storeAddressAndName = function() {
        this.nameValue = this.name.getAttribute('value');
        this.numberValue = this.number.getAttribute('value');
        this.complementValue = this.complement.getAttribute('value');
        this.addressValue = element(by.name('address')).getAttribute('value').then(function(value) {
            return value.slice(4);
        });
    };

    this.dontHaveRecentsOrders = function() {
        browser.wait(EC.textToBePresentInElement($('.order-empty h4 strong'), 'você não tem pedidos recentes.'), 5000);
    };

    this.showButtonAllOrders = function() {
        element(by.buttonText('Ver todos os pedidos'));
    };

};

module.exports = new RegisterUserPage();