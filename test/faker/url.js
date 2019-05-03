const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-url', function() {
    it('随机', function() {
        let schema = string().example(faker.url());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('不含域名', function() {
        let schema = string().example(faker.url({withDomain: false}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && !mockData.startsWith('http'));
    });

    it('含指定域名', function() {
        let schema = string().example(faker.url({domain: "http://www.baidu.com"}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('http://www.baidu.com'));
    });
});