module.exports = class extends require('../base') { 
    constructor({lastName = undefined}) {
        super();
        this._lastName = lastName;
    }

    fake(schema) {
        let FirstNameClass = require('../first_name');
        let LastNameClass = require('../last_name');
        return `${new FirstNameClass().exec({})} ${this._lastName || new LastNameClass().exec({})}`;
    }
};