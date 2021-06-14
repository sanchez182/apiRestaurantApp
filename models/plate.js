const { Schema, model } = require('mongoose');

const PlateSchema = Schema({
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

    foodType:  { type: Schema.Types.ObjectId,
        ref: 'FoodType',
        required: true} ,

    foodTime : { type: Schema.Types.ObjectId,
        ref: 'FoodTime',
        required: true},
 
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    
}, {  collection: 'plates' });


PlateSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Plate', PlateSchema );
