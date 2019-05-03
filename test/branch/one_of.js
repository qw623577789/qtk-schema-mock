const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {string, integer, boolean, object, oneOf} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('oneOf', function() {
    it('string, integer, boolean, object()', function() {
        let schema = oneOf(
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
            })
        );
        let mockData = executer.exec(schema, {
            "": 3,
            ".d": 1
        });
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true && 
            mockData.a !== undefined &&
            mockData.b !== undefined &&
            mockData.c !== undefined &&
            mockData.d !== undefined &&
            mockData.d.da !== undefined
        );
    });

    it('string, integer, boolean, object()引用', function() {
        let schema = {
            a: string(),
            b: integer(),
            c: oneOf(
                string().example(function(parent) {
                    return this.a
                }),
                integer().example(function(parent) {
                    return this.b
                }),
                object({
                    a: string().example(function(parent) {
                        return parent().a
                    }),
                    b: integer().example(function(parent) {
                        return parent().b
                    }),
                })
            )
        };
        let mockData = executer.exec(schema, {
            ".c": 2
        });
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            mockData.c !== undefined &&
            mockData.c.a !== undefined &&
            mockData.c.b !== undefined
        );
    });
});