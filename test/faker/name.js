const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-name', function() {
    it('默认', function() {
        let schema = string().example(faker.name());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true);
    });

    it('指定lastName', function() {
        let schema = string().example(faker.name({lastName: 'Smith'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData.endsWith('Smith'));
    });
});