const assert = require('assert');
const QtkSchema = require('@qtk/schema');;
const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('faker-telephone', function() {
    it('随机', function() {
        let schema = string().example(faker.telephone());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('指定省', function() {
        let schema = string().example(faker.telephone({province: '广东省'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            require('../../src/module/area')
                .find(_ => _.name === '广东省')
                .children
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.map(_ => _.phonePrefix)
                    );
                }, [])
                .some(_ => mockData.startsWith(_))
        );
    });

    it('指定省市', function() {
        let schema = string().example(faker.telephone({province: '广东省', city: '汕头市'}));
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            require('../../src/module/area')
                .find(_ => _.name === '广东省')
                .children
                .find(_ => _.name === '汕头市')
                .children
                .some(_ => mockData.startsWith(_.phonePrefix))
        );
    });

    it('指定省市区', function() {
        let schema = string().example(faker.telephone({province: '广东省', city: '汕头市', country: '濠江区'}));
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
                    .phonePrefix
            )
        );
    });
});