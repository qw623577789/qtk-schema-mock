const RandExp = require('randexp');

module.exports = class extends require('../base') {
    fake(schema) {
        if (schema.pattern !== undefined) return new RandExp(new RegExp(schema.pattern)).gen(); //若有正则，长度限制应该写在正则里
 
        let defaultLength = 5;
        let maxLength = schema.maxLength || schema.minLength || defaultLength;
        let minLength = schema.minLength || defaultLength;
        let length = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
        
        return unescape(
            Array(length).fill("")
                .map(_ => `%u${(Math.round(Math.random() * 20901) + 19968).toString(16)}`)
                .join("")
        );
    }
};