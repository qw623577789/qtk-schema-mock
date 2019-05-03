module.exports = class extends require('../base') {
    constructor({province = undefined}) {
        super();
        if (province === undefined) {
            this._collection = require('../../module/area')
                .reduce((prev, curr) => {
                    return prev.concat(curr.children.map(_ => _.name));
                }, []);
        }
        else {
            this._collection = require('../../module/area')
                .find(_ => _.name === province)
                .children
                .map(_ => _.name);
        }
        
    }
    
    fake(schema) {
        return this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
    }
};