const mongoose = require( 'mongoose' );
const {PostSchema, PostModel} = require( './PostModel' );
const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    posts : [ PostSchema ]
});

const User = mongoose.model( 'users', UserSchema );

const UserModel = {
    create : function( newUser ){
        return User.create( newUser );
    },
    getAll : function(){
        return User.find();
    },
    getOneById : function( id ){
        return User.findOne({_id: id});
    },
    getOneHopeWorks : function( userName ){
        console.log("Getting here");
        return User.findOne(userName);
    },

    getOneByUserName : function( {userName} ){
        console.log("Getting here");
        return User.findOne(userName);
    },
    AddPostToUser : function( userId, newPost ){
        console.log( "I enter here", userId, newPost);
        return PostModel.createPost( newPost)
            .then( result => {
                return User.findOneAndUpdate({_id: userId}, {$push: {posts: result}});
            });
    },
    deleteOne : function( id ){
        return User.deleteOne( {_id: id} );
    },
    updateOne : function( id, userToUpdate ){
        return User.findOneAndUpdate( {_id : id}, {$set : userToUpdate }, {new : true} )
    }
};

module.exports = {UserModel};
