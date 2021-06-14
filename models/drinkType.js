const { Schema, model } = require('mongoose');

const DrinkTypeSchema = Schema({
    drinkTypeName: {
        type: String,
        required: true
    },
    active: Boolean
}, {  collection: 'drinkTypes' });


DrinkTypeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'DrinkType', DrinkTypeSchema );
