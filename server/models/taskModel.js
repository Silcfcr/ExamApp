const mongoose = require( 'mongoose' );
const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    description : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
        default : ""
    },
    completed : {
        type : Boolean,
        required : true,
        default : false
    },
    createdAt : {
        type : Date,
        required: true,
        default : Date.now,
        required : true
    },
    UpdatedAt : {
        type : String,
        type : Date,
        required: true,
        default : Date.now
    },
});

const User = mongoose.model( 'tasks', TaskSchema );

const TaskModel = {
    create : function( task ){
        return User.create( task );
    },
    getAll : function(){
        return User.find();
    },
    getOneById : function( task ){
        return User.findOne({ task });
    },
    deleteOne : function( task ){
        return User.remove( {task} );
    },
    updateOne : function( task, taskToUpdate ){
        return User.findOneAndUpdate( {_id : task}, {$set : taskToUpdate }, {new : true} )
    }
};

module.exports = {TaskModel};
