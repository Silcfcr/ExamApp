const express = require( 'express' );
const {APIController} = require( './../controllers/apiController' );
const APIRouter = express.Router();

APIRouter
    .route( '/' )
    .get( APIController.getAll)
    .post(APIController.addNewTask);
APIRouter
    .get('/:id', APIController.getOneTask )
APIRouter
    .delete( '/:id', APIController.deleteOne );

APIRouter
    .put( '/:id', APIController.updateTask );

module.exports = { APIRouter };