const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {integer} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-timestamp', function() {
    it('随机', function() {
        let schema = integer().example(faker.timestamp());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
        console.log(mockData)
    });

    it('指定时间', function() {
        let schema = integer().example(faker.timestamp({at: '2019-04-01 12:00:00'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData === 1554091200);
        console.log(mockData)
    });

    it('指定时间+偏差', function() {
        let schema = integer().example(faker.timestamp({at: '2019-04-01 12:00:00', offset:{hours: -1, minutes: 1}}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData === 1554087660);
    });

    it('13位时间戳', function() {
        let schema = integer().example(faker.timestamp({milli: true}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.toString().length === 13);
        console.log(mockData)
    });
});