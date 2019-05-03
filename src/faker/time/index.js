const moment = require('moment');

module.exports = class DateTimeTime extends require('../base') {
    constructor({format = 'HH:mm:ss', at = undefined, offset = {
        years: 0, quarters: 0, months: 0, weeks: 0,
        days: 0, hours: 0, minutes: 0, seconds: 0
    }}) {
        super();
        this._format = format;
        this._at = at === undefined ? moment().subtract(this.randomIntegerInRange(-20000, 20000), "seconds") : moment(at, 'HH:mm:ss');
        this._at.add(offset);
    }
    
    fake(schema) {
        return moment(this._at).format(this._format);
    }
};