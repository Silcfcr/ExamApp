const mongoose = require( 'mongoose' );

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 8,
    },
    options : {
        type : [{}],
        required : true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
});

const Post = mongoose.model( 'posts', PostSchema );

const PostModel = {
    createPost : function( newPost ){
        return Post.create( newPost );
    },
    getOneById : function( id ){
        return Post.findOne({_id: id});
    },
    updatePost : function( id, postToUpdate ){
        return Post.findOneAndUpdate( {_id : id}, {$set : postToUpdate }, {new : true} )
    }
}

module.exports = {
    PostSchema, 
    PostModel,
    Post
};