const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-chinese', function() {
    it('默认', function() {
        let schema = string().example(faker.chinese());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && /^[\u4E00-\u9FA5]*$/.test(mockData));
    });
});