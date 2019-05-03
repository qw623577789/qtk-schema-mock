module.exports = class extends require('../base') {
    fake(schema) {
        let maximum = Number.MAX_SAFE_INTEGER;
        let minimum = Number.MIN_SAFE_INTEGER;
        if (schema.maximum !== undefined) maximum = schema.maximum;
        if (schema.exclusiveMaximum !== undefined) maximum = schema.exclusiveMaximum - 1;
        if (schema.minimum !== undefined) minimum = schema.minimum;
        if (schema.exclusiveMinimum !== undefined) minimum = schema.exclusiveMinimum + 1; 
        return this.randomIntegerInRange(minimum, maximum);
    }
};