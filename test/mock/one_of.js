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
            })
        );
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
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
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });
});