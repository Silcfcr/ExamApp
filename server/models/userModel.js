const mongoose = require( 'mongoose' );
const {BicycleSchema, BicycleModel} = require( './BicycleModel' );
const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    lastName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    bicycles : [ BicycleSchema ]
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
    getOneByEmail : function( email ){
        console.log("Getting here");
        return User.findOne({email});
    },
    AddBicycleToUser : function( userId, newBicycle ){
        console.log(userId, "userid");
        console.log("i AM IN FACT GETTING HERE")
        return BicycleModel.createBicycle( newBicycle)
            .then( result => {
                console.log("I'm inside result");
                return User.findOneAndUpdate({email: userId}, {$push: {bicycles: result}});
            });
    },
    deleteOne : function( id ){
        return User.deleteOne( {_id: id} );
    },
    updateOne : function( id, userToUpdate ){
        return User.findOneAndUpdate( {_id : id}, {$set : userToUpdate }, {new : true} )
    },
};

module.exports = {UserModel};
