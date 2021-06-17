const { Schema, model } = require('mongoose'); 


const RestaurantSchema = Schema({
    name: {
        type: String,
        required: true
    },
    ubication: {
        long: Number,
        lat: Number,
    },
    img: {
        type: String,
    },     
 

    foodTimeList: [{
      model: { type: Schema.Types.ObjectId,
        ref: 'FoodTime',
        required: true},
        isActive: Boolean,
        showInApp: Boolean
    }],
 
    foodTypeList: [{
        model: { type: Schema.Types.ObjectId,
          ref: 'FoodType',
          required: true},
          isActive: Boolean,
          showInApp: Boolean
      }],

    drinkTypeList: [{
        model: { type: Schema.Types.ObjectId,
          ref: 'DrinkType',
          required: true},
          isActive: Boolean,
          showInApp: Boolean
      }],

      tableList: [{
            tableNumer: Number,
            selected: Boolean
        }]

}, {  collection: 'restaurants' });


RestaurantSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model( 'Restaurant', RestaurantSchema );
