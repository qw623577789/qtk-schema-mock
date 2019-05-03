const RandExp = require('randexp');

module.exports = class DateTimeDate extends require('../base') {
    constructor({prefix = undefined}) {
        super();
        this._prefix = prefix;
    }

    fake(schema) {
        let prefix = this._prefix || new RandExp(/^((13[0-9])|(14[57])|(15[0-35-9])|(17[035-8])|(18[0-9])|166|198|199|(147))$/).gen();
        return `${prefix}${new RandExp(/^\d{8}$/).gen()}`;
    }
};