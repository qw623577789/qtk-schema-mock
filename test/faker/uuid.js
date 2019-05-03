const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-uuid', function() {
    it('默认', function() {
        let schema = string().example(faker.uuid());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true);
    });

    it('不含"-"', function() {
        let schema = string().example(faker.uuid({withThrough: false}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData.indexOf('-') === -1);
    });

    it('大写', function() {
        let schema = string().example(faker.uuid({upperCase: true}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData === mockData.toUpperCase());
    });
});