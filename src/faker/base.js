module.exports = class BaseFaker{
    constructor() {

    }
    
    randomIntegerInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomFloatInRange(min, max, precision = -1) {
        if (precision !== -1) {
            return Number((Math.random() * (max - min) + min).toFixed(precision));
        }
        return Math.random() * (max - min) + min;
    }

    exec(schema) {
        if (schema.enum !== undefined) return schema.enum[this.randomIntegerInRange(0, schema.enum.length - 1)];
        if (this.fake !== undefined) return this.fake(schema);
        throw new Error('mush has fake');
    }

};