const assert = require('assert');
const moment = require('moment');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-id-card', function() {
    it('随机', function() {
        let schema = string().example(faker.idCard());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true);
    });

    it('指定生日', function() {
        let schema = string().example(faker.idCard({birth: '1993-05-06'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        assert(validator.validate(mockData) === true && mockData.substr(6, 8) === '19930506');
    });

    it('指定岁数', function() {
        let schema = string().example(faker.idCard({age: 25}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && moment().diff(moment(mockData.substr(6, 8), 'YYYYMMDD'), 'years') === 25);
        console.log(mockData)
        
    });

    it('指定性别', function() {
        let schema = string().example(faker.idCard({isMale: false}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.substring(-2, -1) % 2 === 0);
        console.log(mockData)
    });

    it('指定省', function() {
        let schema = string().example(faker.idCard({province: '广东省'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            mockData.startsWith(
                require('../../src/module/area')
                    .find(_ => _.name === '广东省')
                    .areaCode.substring(0, 2)
            )
        );
        console.log(mockData)
    });

    it('指定省市', function() {
        let schema = string().example(faker.idCard({province: '广东省', city: '汕头市'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            mockData.startsWith(
                require('../../src/module/area')
                    .find(_ => _.name === '广东省')
                    .children
                    .find(_ => _.name === '汕头市')
                    .areaCode.substring(0, 4)
            )
        );
        console.log(mockData)
    });

    it('指定省市区', function() {
        let schema = string().example(faker.idCard({province: '广东省', city: '汕头市', country: '濠江区'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            mockData.startsWith(
                require('../../src/module/area')
                    .find(_ => _.name === '广东省')
                    .children
                    .find(_ => _.name === '汕头市')
                    .children
                    .find(_ => _.name === '濠江区')
                    .areaCode.substring(0, 6)
            )
        );
        console.log(mockData)
    });
});