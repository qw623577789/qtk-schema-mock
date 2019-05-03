const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');
const moment = require('moment');

describe('faker-birthday', function() {
    it('默认18岁，YYYY-MM-DD', function() {
        let schema = string().example(faker.birthday());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(
            validator.validate(mockData) === true && 
            /\d{4}-\d{2}-\d{2}/.test(mockData) &&
            moment().diff(moment(mockData), 'years') == 18
        );
    });

    it('指定岁数', function() {
        let schema = string().example(faker.birthday({age: 20}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && moment().diff(moment(mockData), 'years') == 20);
    });

    it('指定格式', function() {
        let schema = string().example(faker.birthday({format: 'YYYYMMDD'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && /\d{4}\d{2}\d{2}/.test(mockData));
    });
});