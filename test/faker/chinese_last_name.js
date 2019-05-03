const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-chinese-last-name', function() {
    it('默认', function() {
        let schema = string().example(faker.chineseLastName());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true);
    });
});