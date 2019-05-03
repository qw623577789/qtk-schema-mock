const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {boolean} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('boolean', function() {
    it('boolean()', function() {
        let schema = boolean();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.boolean());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);

        schema.example(true);
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true && mockData === true);
    });
    it('.enum()', function() {
        let schema = boolean().enum(true);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.boolean());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
});