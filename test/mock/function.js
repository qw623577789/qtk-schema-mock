const assert = require('assert');
const QtkSchema = require('@qtk/schema');
const {object, string, integer, array} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index');

describe('function', function() {
    it('同级已生成的值依赖', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer(),
            foo1: string().example(function() {
                return this.foo + this.bar
            })
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(mockData)
    });

    it('同级未生成的值依赖', function() {
        let schema = object().properties({
            foo1: string().example(function(parent) {
                return this.foo + this.bar
            }),
            foo: string(),
            bar: integer()
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(mockData)
    });

    it('爷爷级已生成的值依赖', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer(),
            child: {
                foo1: string().example(function(parent) {
                    return parent(0).foo + parent().bar
                }),
            }
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('爷爷级已生成的值依赖', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer(),
            child: {
                foo1: string().example(function(parent) {
                    return parent().foo + parent().bar
                }),
            }
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('曾祖父级已生成的值依赖', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer(),
            child: {
                child: {
                    foo1: string().example(function(parent) {
                        let grandfather = parent(1);
                        return grandfather.foo + grandfather.bar
                    }),
                }
            }
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.child.child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('曾祖父级未生成的值依赖', function() {
        let schema = object().properties({
            child: {
                child: {
                    foo1: string().example(function(parent) {
                        let grandfather = parent(1);
                        return grandfather.foo + grandfather.bar
                    }),
                }
            },
            foo: string(),
            bar: integer()
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.child.child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('曾祖父级已生成的值连环依赖', function() {
        let schema = object().properties({
            foo: string().example(function() {
                return `${this.bar}完美的分隔符` 
            }),
            bar: integer(),
            child: {
                child: {
                    foo1: string().example(function(parent) {
                        let grandfather = parent(1);
                        return grandfather.foo + grandfather.bar
                    }),
                }
            },
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.child.child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('曾祖父级未生成的值连环依赖', function() {
        let schema = object().properties({
            child: {
                child: {
                    foo1: string().example(function(parent) {
                        let grandfather = parent(1);
                        return grandfather.foo + grandfather.bar
                    }),
                }
            },
            foo: string().example(function() {
                return `${this.bar}完美的分隔符` 
            }),
            bar: integer(),
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.child.child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('数组：同级已生成的值依赖', function() {
        let schema = array({
            foo: string(),
            bar: integer(),
            foo1: string().example(function() {
                return this.foo + this.bar
            })
        }).length(1);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        console.log(mockData)
        console.log(validator.validate(mockData) === true)
        assert(validator.validate(mockData) === true && mockData[0].foo1 === `${mockData[0].foo}${mockData[0].bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('数组：同级未生成的值依赖', function() {
        let schema = array({
            foo1: string().example(function() {
                return this.foo + this.bar
            }),
            foo: string(),
            bar: integer(),
        }).length(1);
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData[0].foo1 === `${mockData[0].foo}${mockData[0].bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('数组：爷爷级已生成的值依赖', function() {
        let schema = array({
            foo: string(),
            bar: integer(),
            child: {
                foo1: string().example(function(parent) {
                    return parent().foo + parent().bar
                }),
            }
        });
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData[0].child.foo1 === `${mockData[0].foo}${mockData[0].bar}`);
        console.log(JSON.stringify(mockData))
    });


    it('数组：爷爷级已生成的值依赖2', function() {
        let schema = {
            foo: string(),
            bar: integer(),
            array: array({
                child: {
                    foo1: string().example(function(parent) {
                        return parent(2).foo + parent(2).bar
                    }),
                }
            })
        };
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && mockData.array[0].child.foo1 === `${mockData.foo}${mockData.bar}`);
        console.log(JSON.stringify(mockData))
    });

    it('数组：数组同级已生成的值依赖', function() {
        let schema = {
            foo: string(),
            bar: integer(),
            array: array({
                child: {
                    foo1: string().example(function(parent) {
                        let parentArray = parent(1);
                        if (parentArray.length == 0) {
                            return parent(2).foo + parent(2).bar;
                        }
                        else {
                            return `引用数组一个元素内的foo1:${parentArray[0].child.foo1}`;
                        };
                    }),
                }
            }).length(2)
        };
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(
            validator.validate(mockData) === true && 
            mockData.array[0].child.foo1 === `${mockData.foo}${mockData.bar}` &&
            mockData.array[1].child.foo1 === `引用数组一个元素内的foo1:${mockData.array[0].child.foo1}`
        );
        console.log(JSON.stringify(mockData))
    });
});