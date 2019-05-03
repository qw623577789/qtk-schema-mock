const RandExp = require('randexp');

module.exports = class extends require('../base') {
    constructor({withDomain = true, domain = undefined}) {
        super();
        this._withDomain = withDomain;
        this._domain = domain;
    }
    
    fake(schema) {
        let domain = "";
        if (this._withDomain) {
            domain = this._domain || new RandExp(/https?:\/\/[a-z]{3,6}\.[a-z]{3,8}\.(com|net|cn|me)/).gen();
        }
        return `${domain}${new RandExp(/\/[a-zA-Z0-9]{2,7}\.(html|png|jpg|gif)/).gen()}`;
    }
};
