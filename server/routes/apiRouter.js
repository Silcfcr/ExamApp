const express = require( 'express' );
const {APIController} = require( './../controllers/apiController' );
const APIRouter = express.Router();

APIRouter
    .route( '/' )
    .get( APIController.getAll)
    .post(APIController.addNew);
APIRouter
    .route('/:id')
    .get(APIController.getOne)
    .delete(APIController.deleteOne );

APIRouter
    .put( '/:id', APIController.updateOne );
APIRouter
    .post( '/:email', APIController.addNewBicycle );
APIRouter
    .post('/user/login', APIController.userLogin );

APIRouter
    .get( '/user/logout', APIController.userLogout );

APIRouter
    .get( '/:id/email', APIController.getOneByEmail );
APIRouter
    .get( '/user/validate', APIController.validateUser );

APIRouter
    .delete( '/bike/:id', APIController.deleteBicycle );

    

    module.exports = { APIRouter };