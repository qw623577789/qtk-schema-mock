module.exports = class extends require('../base') {
    fake(schema) {
        let _enum = schema.enum || [true, false];
        return _enum[this.randomIntegerInRange(0, _enum.length - 1)];
    }
};