const RandExp = require('randexp');

module.exports = class extends require('../base') {
    fake(schema) {
        return new RandExp(/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/).gen();
    }
};