const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {number} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('number', function() {
    it('number()', function() {
        let schema = number();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.number());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.number({precision: 2}));
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true && [2, 1].includes(mockData.toString().split('.').pop().length)) //小数点后第二位若为0,则数字显示只有一位;
    });
    it('.enum()', function() {
        let schema = number().enum(1, 2, 3.3);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.number());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.min() & .max()', function() {
        let schema = number().min(0.9).max(3.1);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.number());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.exclusiveMin() & .exclusiveMax()', function() {
        let schema = number().exclusiveMin(0.9).exclusiveMax(3.1);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.number());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
});