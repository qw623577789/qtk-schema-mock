module.exports = class extends require('../base') {
    constructor({province = undefined, city = undefined, country = undefined}) {
        super();
        if (province === undefined) {
            this._collection = require('../../module/area')
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.reduce((prev, curr) => {
                            return prev.concat(
                                curr.children.map(_ => _.zipCode)
                            )
                        }, [])
                    );
                }, []);
        }
        else if (city === undefined) {
            this._collection = require('../../module/area')
                .find(_ => _.name === province)
                .children
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.map(_ => _.zipCode)
                    );
                }, []);
        }
        else if (country === undefined) {
            this._collection = require('../../module/area')
                .find(_ => _.name === province)
                .children
                .find(_ => _.name === city)
                .children
                .map(_ => _.zipCode);
        }
        else {
            this._collection = [
                require('../../module/area')
                    .find(_ => _.name === province)
                    .children
                    .find(_ => _.name === city)
                    .children
                    .find(_ => _.name === country)
                    .zipCode
            ];
        }
    }
    
    fake(schema) {
        return this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
    }
};