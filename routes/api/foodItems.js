const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Item Model

const FoodItem = require('../../models/FoodItem');

//@route GET api/foodItems
//@desc Get all foodItems
//@acces Public
router.get('/',(req,res) =>{
    FoodItem.find()
    //sort by date descendent 
    .sort({date:-1})
    .then(items => res.json(items))
});

//@route POST api/foodItems
//@desc Create a foodItem
//@acces Private
router.post('/', auth,(req, res) => {
    const newItem = new FoodItem({
        name: req.body.name
    })
    newItem.save()
        .then(foodItem => res.json(foodItem))
        .catch(err => console.log(err));
        
})

//@route DELETE api/foodItems/:id
//@desc Delete a foodItem
//@acces Private
router.delete('/:id',auth, (req, res) => {
    FoodItem.findById(req.params.id)
    .then( item => item.deleteOne().then( () => res.json({success: true})))  
    .catch(err => res.status(404).json({ success: false})) 
})
    


module.exports = router;