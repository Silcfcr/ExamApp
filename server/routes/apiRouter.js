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
    .post( '/:email', APIController.addNewPost );
APIRouter
    .post('/user/login', APIController.userLogin );

APIRouter
    .get( '/user/logout', APIController.userLogout );

APIRouter
    .get( '/:id/username', APIController.getOneByUserName );
APIRouter
    .get( '/user/validate', APIController.validateUser );

APIRouter
    .delete( '/delete/:id', APIController.deletePost );
APIRouter
    .get( '/post/:id', APIController.getOnePost );

APIRouter.put('/vote/:id', APIController.updateVotes);
    

    module.exports = { APIRouter };