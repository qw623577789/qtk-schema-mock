const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-address', function() {
    it('随机', function() {
        let schema = string().example(faker.address());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定省', function() {
        let schema = string().example(faker.address({province: '广东省'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('广东省'));
    });

    it('指定省市', function() {
        let schema = string().example(faker.address({province: '广东省', city: '汕头市'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('广东省汕头市'));
    });

    it('指定省市区', function() {
        let schema = string().example(faker.address({province: '广东省', city: '汕头市', country: '濠江区'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('广东省汕头市濠江区'));
    });
});