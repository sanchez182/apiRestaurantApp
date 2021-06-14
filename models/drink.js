const { Schema, model } = require('mongoose');

const DrinkSchema = Schema({
    name: {
        type: String,
        required: true
    },
    
    img: {
        type: String,
    },

    price: Number,

    description: String,

    isActive: Boolean,

    showInApp: Boolean,

    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },

    drinkType: {
        type: Schema.Types.ObjectId,
        ref: 'DrinkType',
        required: true
    },
    
}, {  collection: 'drinks' });


DrinkSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Drink', DrinkSchema );
