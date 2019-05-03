const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-zip-code', function() {
    it('随机', function() {
        let schema = string().example(faker.zipCode());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
        console.log(mockData)
    });

    it('指定省', function() {
        let schema = string().example(faker.zipCode({province: '广东省'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            require('../../src/module/area')
                .find(_ => _.name === '广东省')
                .children
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.map(_ => _.zipCode)
                    );
                }, [])
                .some(_ => mockData.startsWith(_))
        );
        console.log(mockData)
    });

    it('指定省市', function() {
        let schema = string().example(faker.zipCode({province: '广东省', city: '汕头市'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            require('../../src/module/area')
                .find(_ => _.name === '广东省')
                .children
                .find(_ => _.name === '汕头市')
                .children
                .some(_ => mockData.startsWith(_.zipCode))
            );
        console.log(mockData)
    });

    it('指定省市区', function() {
        let schema = string().example(faker.zipCode({province: '广东省', city: '汕头市', country: '濠江区'}));
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
                    .zipCode
            )
        );
        console.log(mockData)
    });
});