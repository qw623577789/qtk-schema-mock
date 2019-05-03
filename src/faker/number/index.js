module.exports = class extends require('../base') {
    constructor({precision = -1}) {
        super();
        this._precision = precision;
    }

    fake(schema) {
        let maximum = 10000000;
        let minimum = -1000000;
        if (schema.maximum !== undefined) maximum = schema.maximum;
        if (schema.exclusiveMaximum !== undefined) maximum = schema.exclusiveMaximum - 1;
        if (schema.minimum !== undefined) minimum = schema.minimum;
        if (schema.exclusiveMinimum !== undefined) minimum = schema.exclusiveMinimum + 1; 
        return this.randomFloatInRange(minimum, maximum, this._precision);
    }
};