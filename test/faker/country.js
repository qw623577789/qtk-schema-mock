const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-country', function() {
    it('随机', function() {
        let schema = string().example(faker.country());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定省市', function() {
        let schema = string().example(faker.country({province: '广东省', city: '汕头市'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true && 
            require('../../src/module/area')
                .find(_ => _.name === '广东省')
                .children
                .find(_ => _.name === '汕头市')
                .children
                .some(_ => _.name === mockData)
        );
    });
});