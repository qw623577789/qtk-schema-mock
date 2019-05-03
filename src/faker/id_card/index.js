const moment = require('moment');

module.exports = class DateTimeDate extends require('../base') {
    constructor({birth, age, isMale = true, province = undefined, city = undefined, country = undefined}) {
        super();
        this._birth = birth;
        this._age = age;
        this._isMale = isMale;

        if (province === undefined) {
            this._areaCodes = require('../../module/area')
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.reduce((prev, curr) => {
                            return prev.concat(
                                curr.children.map(_ => _.areaCode)
                            )
                        }, [])
                    );
                }, []);
        }
        else if (city === undefined) {
            this._areaCodes = require('../../module/area')
                .find(_ => _.name === province)
                .children
                .reduce((prev, curr) => {
                    return prev.concat(
                        curr.children.map(_ => _.areaCode)
                    );
                }, []);
        }
        else if (country === undefined) {
            this._areaCodes = require('../../module/area')
                .find(_ => _.name === province)
                .children
                .find(_ => _.name === city)
                .children
                .map(_ => _.areaCode);
        }
        else {
            this._areaCodes = [require('../../module/area')
                .find(_ => _.name === province)
                .children
                .find(_ => _.name === city)
                .children
                .find(_ => _.name === country)
                .areaCode
            ];
        }        
    }

    fake(schema) {
        if (this._age !== undefined) {
            return this._genByAge(this._age, this._isMale);
        }
        else if (this._birth !== undefined) {
            return this._genByBirth(this._birth, this._isMale);
        }
        else {
            return this._genByAge(this.randomIntegerInRange(0, 106), Boolean(this.randomIntegerInRange(0, 1)));
        }
    }

    _genByBirth(birth, isMale = true) {
        let _birth = birth.replace(/-/g, '');
        let prefix = `${this._areaCodes[this.randomIntegerInRange(0, this._areaCodes.length - 1)]}${_birth}`;
        let char = prefix.split('');
        let tmp = Number(char[0]) * 7 + Number(char[1]) * 9 + Number(char[2]) * 10 + Number(char[3]) * 5 + Number(char[4]) * 8
            + Number(char[5]) * 4 + Number(char[6]) * 2 + Number(char[7]) * 1 + Number(char[8]) * 6 + Number(char[9]) * 3
            + Number(char[10]) * 7 + Number(char[11]) * 9 + Number(char[12]) * 10 + Number(char[13]) * 5;
        let _17 = isMale ? this.randomIntegerInRange(0, 4) * 2 + 1 : this.randomIntegerInRange(0, 4) * 2;
        let [_15, _16] = this.randomIntegerInRange(0, 99).toString().padStart(2, '0');
        let mapper = {
            0: '1',
            1: '0',
            2: 'X',
            3: '9',
            4: '8',
            5: '7',
            6: '6',
            7: '5',
            8: '4',
            9: '3',
            10: '2'
        };
        let _18 = mapper[(tmp + Number(_15) * 8 + Number(_16) * 4 + Number(_17) * 2) % 11];
        return `${prefix}${_15}${_16}${_17}${_18}`;
    }

    _genByAge(age, isMale = true) {
        let _birth = moment().subtract(age, 'y').format('YYYYMMDD');
        return this._genByBirth(_birth, isMale);
    }
};