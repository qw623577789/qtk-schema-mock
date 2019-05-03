module.exports = class extends require('../base') {
    constructor({province = undefined, city = undefined, country = undefined}) {
        super();
        this._province = province;
        this._city = city;
        this._country = country;
    }
    
    fake(schema) {
        let ProvinceClass = require('../province');
        let CityClass = require('../city');
        let CountryClass = require('../country');
        let StreetClass = require('../street');
        let province = this._province === undefined ? new ProvinceClass().exec({}) : this._province;
        let city = this._city === undefined ? new CityClass(province).exec({}) : this._city;
        let country = this._country === undefined ? new CountryClass(province, city).exec({}) : this._country;
        let street = new StreetClass().exec({});
        return `${province}${city}${country}${street}`;
    }
};