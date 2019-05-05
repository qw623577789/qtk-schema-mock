const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {object, string, integer} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('object', function() {

    it('object()', function() {
        let schema = object();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('.properties()', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer()
        }).requireAll();
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    it('.patternProperties()', function() {
        let schema = object().patternProperties({
            '^foo|bar$': string()
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true);
    });

    describe('if statement', function() {
        it('.if.properties().then.properties()', function() {
            let schema = object()
                .if.properties({type: 'student', student: 111111})
                .then.properties({
                    type: string().enum('student'),
                    student: integer(),
                    staff: integer(),
                }).requireAll()
                .elseIf.properties({type: string().enum('staff')})
                .then.properties({
                    type: string().enum('staff'),
                    staff: integer(),
                }).requireAll()
                .else.properties({
                    type: string(),
                    staff1: integer(),
                }).requireAll()
                .endIf;
            let mockData = executer.exec(schema);
            let validator = Validator.from(schema);
            assert(validator.validate(mockData) === true);
        });

        it('.if.properties().then.require()', function() {
            let schema = object().properties({
                type: string(),
                student: integer(),
                staff: integer(),
                staff1: integer(),
            })
                .if.properties({type: 'student', student: 111111})
                .then.require('type', 'student', 'staff')
                .elseIf.properties({type: 'staff'})
                .then.require('type', 'staff')
                .else.require('type', 'staff1')
                .endIf;
            let mockData = executer.exec(schema);
            let validator = Validator.from(schema);
            assert(validator.validate(mockData) === true);
        });

    });
    
});