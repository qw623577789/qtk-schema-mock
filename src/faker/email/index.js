const RandExp = require('randexp');

module.exports = class DateTimeDate extends require('../base') {
    constructor({suffix = undefined}) {
        super();
        this._suffix = suffix;
    }

    fake(schema) {
        let suffix = this._suffix || new RandExp(/(gmail\.com|yahoo\.com|hotmail\.com|live\.com|qq\.com|163\.com|126\.com|sina\.com|sohu\.com)$/).gen();
        return `${new RandExp(/^[a-zA-Z0-9]{5,20}$/).gen()}@${suffix}`;
    }
};