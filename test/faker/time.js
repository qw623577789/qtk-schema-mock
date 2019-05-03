const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-time', function() {
    it('随机', function() {
        let schema = string().example(faker.time());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定时间', function() {
        let schema = string().example(faker.time({at: '12:00:00'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('12:00:00'));
    });

    it('指定格式', function() {
        let schema = string().example(faker.time({format: 'HHmmss'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && /\d{6}/.test(mockData));
    });

    it('指定时间+偏差', function() {
        let schema = string().example(faker.time({at: '12:00:00', offset:{hours: -1, minutes: 1}}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData === '11:01:00');
    });
});