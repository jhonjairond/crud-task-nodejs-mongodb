const mongoose  = require("mongoose");
const Schema=mongoose.Schema;    

const esquemaTelevisor=new Schema({
    
        nombre:String,//required=true,
        precio:Number,//required=true,
        tags:[String,String,String],
        cantidad:Number
        
});

esquemaTelevisor.index({ nombre : 'text', precio : 'text', tags : 'text', cantidad : 'text' }) //indexo para poder buscar por texto

module.exports=mongoose.model('televisor',esquemaTelevisor);