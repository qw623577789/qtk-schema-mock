const BaseFaker = require('../faker/base');
const RandExp = require('randexp');
const Ajv = require('ajv');
const ajv = new Ajv();
const {validator: Validator} = require('@qtk/schema');

module.exports = class {
    static exec(qtkSchema, branchConfig= {}) {
        let jsonSchema = Validator.from(qtkSchema).jsonSchema;
        return this._exec(jsonSchema, undefined, "", new Map(), branchConfig);
    }

    static _exec(schema, contextFakeData, path, globalFakeDataMap, branchConfig) {
        switch(schema.type || 'oneOf') {
            case 'boolean':
            case 'integer':
            case 'string':
            case 'number':
            case 'null':
                return this._basicData(schema, contextFakeData, path, globalFakeDataMap);
            case 'object':
                return this._objectData(schema, contextFakeData, path, globalFakeDataMap, branchConfig); //object存在分支
            case 'array':
                return this._arrayData(schema, contextFakeData, path, globalFakeDataMap, branchConfig); //array item存在分支
            case 'oneOf':
                return this._oneOfData(schema, contextFakeData, path, globalFakeDataMap, branchConfig); //oneOf存在分支
            default:
                break;
        }
    }

    static _basicData(schema, contextFakeData, path, globalFakeDataMap) {
        let value = undefined;
        if (schema.example instanceof BaseFaker) {
            value = schema.example.exec(schema);
        }
        else if (schema.example === undefined) {
            let DefaultFaker = require(`../faker/${schema.type}`);
            value = new DefaultFaker({}).exec(schema);
        }
        else if (typeof schema.example === 'function') {
            let proxy = new Proxy(schema.example, {
                apply (target, ctx, args) {                            
                    return Reflect.apply(target, contextFakeData, [(level = 0) => {
                        let parentPath = path.split('.').slice(0, -2 - level).join('.');
                        return globalFakeDataMap.get(parentPath) || null;
                    }]);
                }
            });
            value = proxy();
            if (value instanceof BaseFaker) value = value.exec(schema);
        }
        else {
            value = schema.example;
        }
        globalFakeDataMap.set(path, value);
        return value;
    }

    static _objectData(schema, contextFakeData, path, globalFakeDataMap, branchConfig) {
        let value = undefined;
        let that = this;
        let proxy = new Proxy({}, {
            get: function(target, key, _proxy) {
                if (
                    schema.properties === undefined ||
                    schema.properties[key] === undefined || 
                    schema.properties[key].type === undefined
                ) { //非schema定义的字段原路返回，原路返回；
                    return Reflect.get(target, key, _proxy);
                }
                if (!Object.keys(target).includes(key)) { //节点值还未生成,则先进行生成
                    value = that._exec(schema.properties[key], _proxy, `${path}.${key}`, globalFakeDataMap, branchConfig);
                    target[key] = value;
                    return value;
                }
                else {
                    return target[key];
                }
            },
        });
        globalFakeDataMap.set(path, proxy);

        //if-require处理
        // console.log(schema)
        if (schema.if !== undefined) {
            let listIfObjectSchema = this._listIfObjectSchema(schema);
            let randomIndex = branchConfig[path] === undefined ? Math.floor(Math.random() * listIfObjectSchema.length) : branchConfig[path];
            schema = listIfObjectSchema[randomIndex];
            schema = this._getIfObjectSchema(schema, listIfObjectSchema.filter((_, index) => index !== randomIndex));
        }

        if (schema.patternProperties !== undefined) {
            value = Object.keys(schema.patternProperties).reduce((prev, key) => {
                prev[new RandExp(new RegExp(key)).gen()] = this._exec(schema.patternProperties[key], prev, `${path}.${key}`, globalFakeDataMap, branchConfig);
                return prev;
            }, proxy);
        }
        else {
            value = Object.keys(schema.properties || {}).reduce((prev, key) => {
                if (!Object.keys(prev).includes(key)) prev[key] = this._exec(schema.properties[key], prev, `${path}.${key}`, globalFakeDataMap, branchConfig);
                return prev;
            }, proxy);
        }

        return value;
    }

    static _arrayData(schema, contextFakeData, path, globalFakeDataMap, branchConfig) {
        let defaultAmount = 1;
        let maxItems = schema.maxItems || schema.minItems || defaultAmount;
        let minItems = schema.minItems || defaultAmount;
        let amount = Math.floor(Math.random() * (maxItems - minItems + 1) + minItems);
        let collection = [];
        globalFakeDataMap.set(path, collection);
        if (schema.items !== undefined) {
            for (let index in Array(amount).fill("")) {
                let item = this._exec(schema.items, collection, `${path}.[${index}]`, globalFakeDataMap, branchConfig);
                collection.push(item);
                globalFakeDataMap.set(`${path}.[${index}]`, item);
            }
        }
        return collection;
    }

    static _oneOfData(schema, contextFakeData, path, globalFakeDataMap, branchConfig) {
        let randomIndex = branchConfig[path] === undefined ? Math.floor(Math.random() * schema.oneOf.length) : branchConfig[path];
        return this._exec(schema.oneOf[randomIndex], contextFakeData, path, globalFakeDataMap, branchConfig);
    }

    static _listIfObjectSchema(schema, collection = []) {
        let ifObject = {
            type: "object",
            required: schema.then.required || [],
            additionalProperties: schema.then.additionalProperties === undefined ? true : schema.then.additionalProperties
        }

        //处理properties
        if (schema.then.properties !== undefined) {
            ifObject.properties = Object.assign(schema.then.properties, schema.if.properties);
        }
        else if (schema.properties !== undefined) {
            ifObject.properties = Object.assign(
                ifObject.required.reduce((prev, curr) => {
                    prev[curr] = schema.properties[curr];
                    return prev;
                },{}),
                schema.if.properties
            );
        }
        else {
            ifObject.properties = undefined;
        }

        //处理patternProperties
        if (schema.then.patternProperties !== undefined) {
            ifObject.patternProperties = Object.assign(schema.then.patternProperties, schema.if.patternProperties);
        }
        else if (schema.patternProperties !== undefined) {
            ifObject.patternProperties = Object.assign(
                ifObject.required.reduce((prev, curr) => {
                    prev[curr] = schema.patternProperties[curr];
                    return prev;
                },{}),
                schema.if.patternProperties
            );
        }
        else {
            ifObject.patternProperties = undefined;
        }

        collection.push(
            Object.assign({
                _if: schema.if.properties || true
            }, ifObject)
        );

        //处理else
        if (schema.else === false) { //endif情况
            return collection;
        }
        else if (schema.else.if !== undefined) { //elseif情况
            this._listIfObjectSchema(
                Object.assign({
                    properties: schema.properties,
                    patternProperties: schema.propertiesObject
                }, schema.else),
                collection
            );
        }
        else {
            this._listIfObjectSchema( //else情况(排除)
                {
                    if: true,
                    else: false,
                    properties: schema.properties,
                    patternProperties: schema.propertiesObject,
                    then: schema.else
                }, 
                collection
            );
        }

        return collection;
    }

    static _getIfObjectSchema(schema, otherSchemas) {
        if (schema._if === true) { //else情况，需要排除if/elseIf情况
            //提取其他if条件的key schema
            let ifKeySchemas = otherSchemas.reduce((pre, curr) => {
                Object.keys(curr._if).forEach(key => {
                    pre[key] = (pre[key] || []).concat(curr._if[key])
                });
                return pre;
            }, {});

            //生成else情况的条件schema
            let ifKeyMockValues = Object.keys(ifKeySchemas).reduce((prev, key) => {
                let fieldSchema = (schema.properties !== undefined && schema.properties[key]) || 
                    (schema.patternProperties !== undefined && schema.patternProperties[key]) || undefined;
                if (fieldSchema === undefined) return prev; //当前条件对key无要求，则跳过

                if (fieldSchema.enum !== undefined && fieldSchema.enum.length <= 100) { //随机生成一个碰撞概率大于0.01,采用排除法
                    let mockValues = fieldSchema.enum.filter(_ => ifKeySchemas[key].every(__ => !__.enum.includes(_)));
                    if (mockValues.length === 0) throw new Error(`if/elseIf条件已经覆盖字段${key}值所有情况，无法生成else情况数据`);
                    let randomIndex = Math.floor(Math.random() * mockValues.length)
                    prev[key] = {type: fieldSchema.type, enum: [mockValues[randomIndex]]};
                }
                else { //碰撞可能性低，即使碰撞，再生成一次，赌100次
                    let mockValue = undefined;
                    for (let i = 0 ; i < 100; i++) {
                        //生成模拟数据
                        mockValue = this._basicData(fieldSchema, undefined, "", new Map());
                        //检查是否命中其他条件的该字段值
                        let checkResult = ifKeySchemas[key].every(_ => !ajv.compile(_)(mockValue));
                        if (checkResult === true)　break;
                        mockValue = undefined; //出现碰撞，再来一次
                    }
                    if (mockValue === undefined) throw new Error('尝试100次生成模拟数据都出现命中其他条件的该字段值，这概率太．．．先冷静下');
                    prev[key] = {type: fieldSchema.type, enum: [mockValue]};
                }

                return prev;
            }, {});
            
            //合成最终的else情况的object schema
            if (schema.properties !== undefined) {
                Object.assign(schema.properties, ifKeyMockValues);
            }
            else {
                Object.assign(schema.patternProperties, ifKeyMockValues);
            }
            
            return schema;
        }
        else {　// if/elseIf 情况直接使用该条件的schema即可
            return schema;
        }
    }
};