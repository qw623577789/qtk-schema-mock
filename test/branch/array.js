const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {array, string, oneOf, integer, boolean, object} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('array', function() {
    it('.item()', function() {
        let schema = array().item(
            oneOf(
                string(),
                integer(),
                boolean(),
                object({
                    a: string(),
                    b: integer(),
                    c: boolean(),
                    d: oneOf(
                        integer(),
                        {
                            da: string()
                        }
                    )
                }).requireAll()
            )
        );
        let mockData = executer.exec(schema, {
            ".[]": 3,
            ".[].d": 1
        });
        let validator = Validator.from(schema);;
        assert(
            validator.validate(mockData) === true && 
            mockData[0].a !== undefined &&
            mockData[0].b !== undefined &&
            mockData[0].c !== undefined &&
            mockData[0].d !== undefined &&
            mockData[0].d.da !== undefined
        );
    });

});