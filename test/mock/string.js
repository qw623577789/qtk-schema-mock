const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('string', function() {
    it('string()', function() {
        let schema = string();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.string());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);

        schema.title("这是一个简洁标题");
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true && mockData == "这是一个简洁标题");

        schema = string();
        schema.desc("这是一个详细描述");
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true && mockData == "这是一个详细描述");

        schema = string();
        schema.title("这是一个简洁标题");
        schema.desc("这是一个详细描述");
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true && mockData == "这是一个简洁标题");

        schema = string();
        schema.desc("这是一个详细描述");
        schema.length(3);
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true && mockData == "这是一");
    });
    it('.pattern()', function() {
        let schema = string().pattern(/^foo|bar$/);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.string());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.enum()', function() {
        let schema = string().enum('foo', 'bar');
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.string());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.minLength() & maxLength()', function() {
        let schema = string().minLength(1).maxLength(4);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.string());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
    it('.length()', function() {
        let schema = string().length(3);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);

        schema.example(faker.string());
        mockData = executer.exec(schema);
        assert(validator.validate(mockData) === true);
    });
});