const defaultFaker = {
    address: ({province, city, country} = {}) => {
        let Faker = require('./src/faker/address');
        return new Faker({province, city, country});
    },
    areaCode: ({province, city, country} = {}) => {
        let Faker = require('./src/faker/area_code');
        return new Faker({province, city, country});
    },
    birthday: ({age = 18, format = 'YYYY-MM-DD'} = {}) => {
        let Faker = require('./src/faker/birthday');
        return new Faker({age, format});
    },
    boolean: () => {
        let Faker = require('./src/faker/boolean');
        return new Faker();
    },
    chinese: () => {
        let Faker = require('./src/faker/chinese');
        return new Faker();
    },
    chineseFirstName: () => {
        let Faker = require('./src/faker/chinese_first_name');
        return new Faker();
    },
    chineseLastName: ({lastName} = {}) => {
        let Faker = require('./src/faker/chinese_last_name');
        return new Faker({lastName});
    },
    chineseName: ({lastName} = {}) => {
        let Faker = require('./src/faker/chinese_name');
        return new Faker({lastName});
    },
    city: ({province} = {}) => {
        let Faker = require('./src/faker/city');
        return new Faker({province});
    },
    country: ({province, city} = {}) => {
        let Faker = require('./src/faker/country');
        return new Faker({province, city});
    },
    date: ({format = 'YYYY-MM-DD', at, offset = {
        years: 0, quarters: 0, months: 0, weeks: 0,
        days: 0, hours: 0, minutes: 0, seconds: 0
    }} = {}) => {
        let Faker = require('./src/faker/date');
        return new Faker({format, at, offset});
    },
    dateTime: ({format = 'YYYY-MM-DD HH:mm:ss', at, offset = {
        years: 0, quarters: 0, months: 0, weeks: 0,
        days: 0, hours: 0, minutes: 0, seconds: 0
    }} = {}) => {
        let Faker = require('./src/faker/date_time');
        return new Faker({format, at, offset});
    },
    email: ({suffix} = {}) => {
        let Faker = require('./src/faker/email');
        return new Faker({suffix});
    },
    firstName: () => {
        let Faker = require('./src/faker/first_name');
        return new Faker();
    },
    idCard: ({birth, age, isMale = true, province, city, country} = {}) => {
        let Faker = require('./src/faker/id_card');
        return new Faker({birth, age, isMale, province, city, country});
    },
    integer: () => {
        let Faker = require('./src/faker/integer');
        return new Faker();
    },
    ip: () => {
        let Faker = require('./src/faker/ip');
        return new Faker();
    },
    lastName: () => {
        let Faker = require('./src/faker/last_name');
        return new Faker();
    },
    mobile: ({prefix} = {}) => {
        let Faker = require('./src/faker/mobile');
        return new Faker({prefix});
    },
    name: ({lastName} = {}) => {
        let Faker = require('./src/faker/name');
        return new Faker({lastName});
    },
    null: () => {
        let Faker = require('./src/faker/null');
        return new Faker();
    },
    province: () => {
        let Faker = require('./src/faker/province');
        return new Faker();
    },
    street: () => {
        let Faker = require('./src/faker/street');
        return new Faker();
    },
    string: () => {
        let Faker = require('./src/faker/string');
        return new Faker();
    },
    telephone: ({province, city, country} = {}) => {
        let Faker = require('./src/faker/telephone');
        return new Faker({province , city, country});
    },
    time: ({format = 'HH:mm:ss', at, offset = {
        hours: 0, minutes: 0, seconds: 0
    }} = {}) => {
        let Faker = require('./src/faker/time');
        return new Faker({format, at, offset});
    },
    timestamp: ({at, offset = {
        years: 0, quarters: 0, months: 0, weeks: 0,
        days: 0, hours: 0, minutes: 0, seconds: 0
    }, milli = false} = {}) => {
        let Faker = require('./src/faker/timestamp');
        return new Faker({at, offset, milli});
    },
    url: ({withDomain = true, domain} = {}) => {
        let Faker = require('./src/faker/url');
        return new Faker({withDomain, domain});
    },
    number: ({precision = -1} = {}) => {
        let Faker = require('./src/faker/number');
        return new Faker({precision});
    },
    uuid: ({withThrough = false, upperCase = false} = {}) => {
        let Faker = require('./src/faker/uuid');
        return new Faker({withThrough, upperCase});
    }, 
    zipCode: ({province, city, country} = {}) => {
        let Faker = require('./src/faker/zip_code');
        return new Faker({province, city, country});
    },         
}

const _exports = {
    executer: require('./src/executer'),
    faker: defaultFaker,
    BaseFaker: require('./src/faker/base'),
    registerFaker: (...fakers) => {
        fakers.forEach(({fakerName, faker}) => {
            defaultFaker[fakerName] = (params = {}) => {
                return new faker(params);
            }
        });
        return _exports;
    }
}

module.exports = _exports;
