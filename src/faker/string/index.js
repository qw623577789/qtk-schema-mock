const RandExp = require('randexp');

module.exports = class extends require('../base') {
    fake(schema) {
        if (schema.pattern !== undefined) return new RandExp(new RegExp(schema.pattern)).gen(); //若有正则，长度限制应该写在正则里

        if (schema.title || schema.description !== undefined) { //默认使用描述的字符串
            let example = [schema.title, schema.description].sort((l, r) => r.length - l.length)
                .shift();
            let maxLength = schema.maxLength || Number.MAX_SAFE_INTEGER;
            example = example.substr(0, maxLength);
            if (example !== "") return example;
        }
 
        let defaultLength = 5;
        let maxLength = schema.maxLength || schema.minLength || defaultLength;
        let minLength = schema.minLength || defaultLength;
        let length = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);

        return new RandExp(new RegExp(`[a-zA-Z0-9]{${length}}`)).gen();
    }
};