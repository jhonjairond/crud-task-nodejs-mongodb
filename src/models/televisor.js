const mongoose  = require("mongoose");
const Schema=mongoose.Schema;    

const esquemaTelevsor=new Schema({
    
        nombre:String,//required=true,
        precio:Number,//required=true,
        tags:[String,String,String],
        cantidad:Number
        
});

module.exports=mongoose.model('televisor',esquemaTelevsor);