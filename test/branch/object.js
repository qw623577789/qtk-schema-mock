const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {object, string, integer} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('object', function() {
    it('.if.properties().then.properties()', function() {
        let schema = object()
            .if.properties({type: 'student', student: 111111}) // equivalent : .if.properties({type: 'student'})
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
        let mockData = executer.exec(schema, {
            ".": 0
        });
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            mockData.type === 'student' &&
            mockData.student === 111111 &&
            mockData.staff !== undefined
        );
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
        let mockData = executer.exec(schema, {
            ".": 0
        });
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true &&
            mockData.type === 'student' &&
            mockData.student === 111111 &&
            mockData.staff !== undefined
        );
    });
});