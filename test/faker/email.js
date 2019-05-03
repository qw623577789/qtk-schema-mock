const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-email', function() {
    it('默认', function() {
        let schema = string().example(faker.email());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true);
    });

    it('指定后缀', function() {
        let schema = string().example(faker.email({suffix: 'vanchu.net'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData.endsWith('vanchu.net'));
    });
});