module.exports = class extends require('../base') { 
    constructor({lastName = undefined}) {
        super();
        this._lastName = lastName;
    }

    fake(schema) {
        let FirstNameClass = require('../chinese_first_name');
        let LastNameClass = require('../chinese_last_name');
        return `${new LastNameClass({lastName: this._lastName}).exec({})}${new FirstNameClass().exec({})}`;
    }
};