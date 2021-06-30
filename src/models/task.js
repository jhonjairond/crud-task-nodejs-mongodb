const mongoose  = require("mongoose");
const Schema=mongoose.Schema;                              //hago uso de schema de mongoose

const TaskSchema = new Schema({                             //eschema que tendran nuestras colecciones
    title:String,  
    description:String,
    status:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('task',TaskSchema);         //toma el esquema para guardarlo en una coleccion de mongodb en coleccion task
