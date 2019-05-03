const moment = require('moment');

module.exports = class DateTimeTimestamp extends require('../base') {
    constructor({at = undefined, offset = {
        years: 0, quarters: 0, months: 0, weeks: 0,
        days: 0, hours: 0, minutes: 0, seconds: 0,
        milliseconds: 0
    }, milli = false}) {
        super();
        this._at = at === undefined ? moment().subtract(this.randomIntegerInRange(-20000, 20000), "seconds") : moment(at);
        this._at.add(offset);
        this._milli = milli;
    }
    
    fake(schema) {
        return this._milli === false ? Number(moment(this._at).format('X')) : Number(moment(this._at).format('x'));
    }
};