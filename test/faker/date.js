const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-date', function() {
    it('随机', function() {
        let schema = string().example(faker.date());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
        console.log(mockData)
    });

    it('指定日期', function() {
        let schema = string().example(faker.date({at: '2019-01-01'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('2019-01-01'));
        console.log(mockData)
    });

    it('指定格式', function() {
        let schema = string().example(faker.date({format: 'YYYYMMDD'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && /\d{8}/.test(mockData));
    });

    it('指定日期+偏差', function() {
        let schema = string().example(faker.date({at: '2019-01-01', offset:{days: -1, months: 1}}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData === '2019-01-31');
    });
});