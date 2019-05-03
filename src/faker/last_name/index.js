module.exports = class extends require('../base') {
    constructor() {
        super();
        this._collection = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 
            'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 
            'Lopez', 'gonzalez', 'Wilson', 'Anderson', 'Thomas', 
            'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 
            'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 
            'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 
            'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 
            'Hill', 'Flores', 'green', 'Adams', 'Nelson', 'Baker', 
            'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 
            'Roberts', 'gomez', 'Phillips', 'Evans', 'Turner', 
            'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 
            'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 
            'Rogers', 'gutierrez', 'Ortiz', 'Morgan', 'Cooper', 
            'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 
            'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 
            'Chavez', 'Wood', 'James', 'Bennett', 'gray', 'Mendoza', 
            'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 
            'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'            
        ]
    }
    
    fake(schema) {
        return this._collection[this.randomIntegerInRange(0, this._collection.length - 1)];
    }
};