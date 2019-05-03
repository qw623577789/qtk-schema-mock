const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {integer} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('integer', function() {
    it('integer()', function() {
        let schema = integer();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.integer());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.enum()', function() {
        let schema = integer().enum(1, 2);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.integer());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.min() & .max()', function() {
        let schema = integer().min(1).max(5);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.integer());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.exclusiveMin() & .exclusiveMax()', function() {
        let schema = integer().exclusiveMin(1).exclusiveMax(5);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.integer());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
});