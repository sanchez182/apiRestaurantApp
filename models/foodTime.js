const { Schema, model } = require('mongoose');

const FoodTimeSchema = Schema({
    foodTimeName: {
        type: String,
        required: true
    },
    active: Boolean
}, {  collection: 'foodTimes' });


FoodTimeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'FoodTime', FoodTimeSchema );
