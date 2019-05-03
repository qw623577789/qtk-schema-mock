const RandExp = require('randexp');

module.exports = class extends require('../base') {
    constructor({province = undefined, city = undefined, country = undefined}) {
        super();
        if (province === undefined) {
            this._collection = require('../../module/area')
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.reduce((prev, curr) => {
                            return prev.concat(
                                curr.children.map(_ => _.phonePrefix)
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
                        curr.children.map(_ => _.phonePrefix)
                    );
                }, []);
        }
        else if (country === undefined) {
            this._collection = require('../../module/area')
                .find(_ => _.name === province)
                .children
                .find(_ => _.name === city)
                .children
                .map(_ => _.phonePrefix);
        }
        else {
            this._collection = [require('../../module/area')
                .find(_ => _.name === province)
                .children
                .find(_ => _.name === city)
                .children
                .find(_ => _.name === country)
                .phonePrefix
            ];
        }
    }
    
    fake(schema) {
        let phonePrefix = this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
        return `${phonePrefix}-${new RandExp(/[0-9]{7,8}$/).gen()}`;
    }
};