module.exports = class extends require('../base') {
    constructor() {
        super();
        this._collection = require('../../module/area').map(_ => _.name)
    }
    
    fake(schema) {
        return this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
    }
};