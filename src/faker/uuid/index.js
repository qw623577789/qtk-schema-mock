const uuid = require('uuid').v4;

module.exports = class extends require('../base') {
    constructor({withThrough = false, upperCase = false}) {
        super();
        this._withThrough = withThrough;
        this._upperCase = upperCase;
    }
    
    fake(schema) {
        let _uuid = this._withThrough == false ? uuid().replace(/\-/g, '') : uuid();
        return this._upperCase ? _uuid.toUpperCase() : _uuid;
    }
};