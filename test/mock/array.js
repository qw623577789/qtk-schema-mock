const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {array, string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('array', function() {
    it('array()', function() {
        let schema = array();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.item()', function() {
        let schema = array().item(string());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.minItems().maxItems()', function() {
        let schema = array({
            foo: string().minLength(2).maxLength(10)
        }).minItems(1).maxItems(3);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.length()', function() {
        let schema = array({}).length(3);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });
});