const express = require( 'express' );
const {APIController} = require( './../controllers/apiController' );
const APIRouter = express.Router();

APIRouter
    .route( '/' )
    .get( APIController.getAllUsers )
APIRouter
    .get('/:userName', APIController.getOneUser )
APIRouter
    .post( '/new/:userName', APIController.addNewUserAPI);

APIRouter
    .delete( '/remove/:userName', APIController.deleteUser );

APIRouter
    .put( '/users/update/:userName', APIController.updateUser );

module.exports = { APIRouter };