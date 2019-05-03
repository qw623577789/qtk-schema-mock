const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {NULL, empty} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('null', function() {
    it('NULL() or empty()', function() {
        let schema = NULL();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.null());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);

        schema = empty();
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.null());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
});