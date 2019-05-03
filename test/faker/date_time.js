const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-date-time', function() {
    it('随机', function() {
        let schema = string().example(faker.dateTime());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定日期时间', function() {
        let schema = string().example(faker.dateTime({at: '2019-01-01 00:00:00'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData === '2019-01-01 00:00:00');
    });

    it('指定格式', function() {
        let schema = string().example(faker.dateTime({format: 'YYYYMMDDHHmmss'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && /\d{14}/.test(mockData));
    });

    it('指定日期时间+偏差', function() {
        let schema = string().example(faker.dateTime({at: '2019-01-01', offset:{days: -1, months: 1}}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData === '2019-01-31 00:00:00');
    });
});