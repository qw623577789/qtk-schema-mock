const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-area-code', function() {
    it('随机', function() {
        let schema = string().example(faker.areaCode());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定省', function() {
        let schema = string().example(faker.areaCode({province: '广东省'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('44'));
    });

    it('指定省市', function() {
        let schema = string().example(faker.areaCode({province: '广东省', city: '汕头市'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.startsWith('4405'));
    });

    it('指定省市区', function() {
        let schema = string().example(faker.areaCode({province: '广东省', city: '汕头市', country: '濠江区'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData === '440512');
    });
});