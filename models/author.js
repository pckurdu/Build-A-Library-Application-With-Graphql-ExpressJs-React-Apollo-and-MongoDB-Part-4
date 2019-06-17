
//for mongoose tools
const mongoose=require('mongoose');

//for create mongoose schema
const Schema=mongoose.Schema;

//create schema
const authorSchema=new Schema({

    name:String,
    age:Number,
});

//export the schema
module.exports=mongoose.model('Author',authorSchema);