const mongoose = require( 'mongoose' );

const BicycleSchema = new mongoose.Schema({
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
        maxlength : 20
    },
    price : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    imageUrl : {
        type : String,
        required : true,

    },

});

const Bicycle = mongoose.model( 'bikes', BicycleSchema );

const BicycleModel = {
    createBicycle : function( newBicycle ){
        return Bicycle.create( newBicycle );
    },
    deleteOne: function(id){
        console.log("deleteOne =>", id);
        return Bicycle.deleteOne( {_id : id} );
    },
    findOneBicycle: (id) => {
        return Bicycle.findOne({ _id: id});
    }
}


module.exports = {
    BicycleModel,
    BicycleSchema
};