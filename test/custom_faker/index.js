const assert = require('assert');
const QtkSchema = require('@qtk/schema');;

const CustomAnimalFaker = class extends require('../../index').BaseFaker {
    constructor(params) {
        super();
        this._animals = ["mouse", "rabbit", "cat", "bird"];
    }

    fake(schema) {
        let randomIndex = this.randomIntegerInRange(0, this._animals.length - 1);
        return this._animals[randomIndex];
    }
}

const {string} = QtkSchema.schema;
const Validator = QtkSchema.validator;
const {faker, executer} = require('../../index').registerFaker({
    fakerName: "animal",
    faker: CustomAnimalFaker
});

describe('custom_faker', function() {
    it('随机', function() {
        let schema = string().example(faker.animal());
        let mockData = executer.exec(schema);
        let validator = Validator.from(schema);
        assert(validator.validate(mockData) === true && ["mouse", "rabbit", "cat", "bird"].some(_ => _ === mockData));
    });
});