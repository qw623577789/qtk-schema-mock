const moment = require('moment');

module.exports = class extends require('../base') {
    constructor({age = 18, format = 'YYYY-MM-DD'}) {
        super();
        this._age = age;
        this._format = format;
    }

    fake(schema) {
        let randomMaximum = moment().diff(moment().startOf('years'), 'day');
        return moment().subtract(this._age, 'y')
            .subtract(this.randomIntegerInRange(0, randomMaximum), "days")
            .format(this._format);
    }
};