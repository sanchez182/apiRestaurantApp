const { Schema, model } = require('mongoose');

const FoodTypeSchema = Schema({
    foodTypeName: {
        type: String,
        required: true
    },
    active: Boolean
}, {  collection: 'foodTypes' });


FoodTypeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'FoodType', FoodTypeSchema );
