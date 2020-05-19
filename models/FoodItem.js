const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const FoodItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports =  mongoose.model('FoodItem', FoodItemSchema);