
//for schema
const graphql=require('graphql');
//for lodash library
const _=require('lodash');

//models
const Book=require('../models/book');
const Author=require('../models/author');

// //dummy datas
// var books=[
//     {name:'Harry Potter',type:'fantastic',id:'1',authorId:'1'},
//     {name:'Lord of the Rings',type:'fantastic',id:'2',authorId:'2'},
//     {name:'Sherlock Holmes',type:'detective',id:'3',authorId:'3'},
//     {name:'Harry Potter 2',type:'fantastic',id:'4',authorId:'1'},
//     {name:'Lord of the Rings 2',type:'fantastic',id:'5',authorId:'2'},
//     {name:'Sherlock Holmes 2',type:'detective',id:'6',authorId:'3'},
// ];


// //dummy authors datas
// var authors=[
//     {name:'pc kurdu 1',age:25,id:'1'},
//     {name:'pc kurdu 2',age:67,id:'2'},
//     {name:'pc kurdu 3',age:36,id:'3'}
// ];

//for book type and book fields
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;

//create a book type
const bookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        type:{type:GraphQLString},
        //Let's associate with the author.
        author:{
            type:authorType,
            resolve(parent,args){
                //return _.find(authors,{id:parent.authorId})
            }
        }
    })
});

//create a author type
const authorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        //all author books
        books:{
            type:new GraphQLList(bookType),
            resolve(parent,args){
                //return _.filter(books,{authorId:parent.id});
            }
        }
    })
});

//Creating a mutation using GraphQLObjectType
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //field required to add author
        addAuthor:{
            //author add operations
            type:authorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                //mongoDB codes
                let author=new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        }
    }
});

const RootQuery=new GraphQLObjectType({
    //query name
    name:'RootQueryType',
    //query fields
    fields:{
        //first type for book use bookType
        book:{
            type:bookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //Data coming from database
               // return _.find(books,{id:args.id});
            }
        },
        //first type for author use authorType
        author:{
            type:authorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //Data coming from database
                //return _.find(authors,{id:args.id});
            }
        },
        //for book list
        books:{
            type:new GraphQLList(bookType),
            resolve(parent,args){
               // return books
            }
        },
        //for author list
        authors:{
            type:new GraphQLList(authorType),
            resolve(parent,args){
                //return authors
            }
        }
    }
});



//we export the schema with root query.
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});

