const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-city', function() {
    it('随机', function() {
        let schema = string().example(faker.city());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定省', function() {
        let schema = string().example(faker.city({province: '广东省'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true && 
            require('../../src/module/area')
            .find(_ => _.name === '广东省')
            .children.some(_ => _.name === mockData)
        );
    });
});