const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-mobile', function() {
    it('随机', function() {
        let schema = string().example(faker.mobile());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.length === 11);
    });

    it('指定号段', function() {
        let schema = string().example(faker.mobile({prefix: '135'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('135'));
    });
});