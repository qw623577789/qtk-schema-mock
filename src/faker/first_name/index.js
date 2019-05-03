module.exports = class extends require('../base') {
    constructor() {
        super();
        this._collection = [
            'Aaron', 'Abby', 'Abe', 'Abigail', 'Abraham', 'Adah', 'Adam', 
            'Adams', 'Adela', 'Adolf', 'Aileen', 'Alexander', 'Alice', 
            'Allan', 'Andrew', 'Anna', 'Anne', 'Austin', 'Bailey', 'Baker', 
            'Barton', 'Betty', 'Bill', 'Blair', 'Bob', 'Bonnie', 'Brieuse', 
            'Brown', 'Bruce', 'Buck', 'Byron', 'Camp', 'Carl', 'Carmen', 'Carter', 
            'Catherine', 'Cathy', 'Charles', 'Charley', 'Churchill', 'Claire', 
            'Clark', 'Cole', 'Constantine', 'Daisy', 'Dale', 'David', 'Dean', 
            'Diana', 'Dodge', 'Donald', 'Donna', 'Douglas', 'Edward', 'Eileen', 
            'Elizabeth', 'Evan', 'Eve', 'Ford', 'Fox', 'Francis', 'Frank', 
            'Franklin', 'Gates', 'George', 'Georgia', 'Gill', 'Green', 'Ham', 
            'Hamlet', 'Hawk', 'Helen', 'Henley', 'Hilary', 'Hill', 'Hugo', 'Hunter', 
            'Jack', 'Jackson', 'James', 'Jane', 'Jesse', 'Jessica', 'Jim', 'John', 
            'Johnson', 'Jordan', 'Joseph', 'Julia', 'Juliet', 'Karl', 'Kathryn', 
            'Kathryn', 'Kathy', 'Kent', 'Lane', 'Laura', 'Lewis', 'Lincoln', 'Linda', 
            'Lucia', 'Lucy', 'Mac', 'MacDonald', 'Madeline', 'Main', 'Margaret', 
            'Maria', 'Marie', 'Marlin', 'Martha', 'Martin', 'Mary', 'Max', 'Michael', 
            'Michel', 'Mike', 'Molly', 'Morgan', 'Moses', 'Nancy', 'Newton', 'Noah', 
            'Norman', 'Norton', 'Orlando', 'Oscar', 'Owen', 'Paul', 'Pete', 'Peter', 
            'Philip', 'Pike', 'Reynold', 'Richard', 'Robert', 'Robin', 'Robinson', 
            'Roger', 'Roland', 'Rudolph', 'Ruth', 'Sam', 'Samantha', 'Sean', 'Shaw', 
            'Shawn', 'Shirley', 'Sidney', 'Simon', 'Smith', 'Solomon', 'Sophia', 
            'Sophie', 'Steve', 'Steven', 'Stevenson', 'Strong', 'Susan', 'Taylor', 
            'Thomas', 'Toby', 'Tom', 'Tommy', 'Toni', 'Tony', 'Tyler', 'Victor', 
            'Victoria', 'Walter', 'Washington', 'Wendy', 'White', 'William', 'Williams', 
            'Wood', 'Xavier', 'York', 'Zoe'            
        ]
    }
    
    fake(schema) {
        return this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
    }
};