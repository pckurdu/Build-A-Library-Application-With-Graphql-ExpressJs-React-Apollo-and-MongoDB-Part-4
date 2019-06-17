
//for mongoose tools
const mongoose=require('mongoose');

//for create mongoose schema
const Schema=mongoose.Schema;

//create schema
const bookSchema=new Schema({

    name:String,
    type:String,
    authorId:String
});

//export the schema
module.exports=mongoose.model('Book',bookSchema);