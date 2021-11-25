const {UserModel} = require( './../models/userModel' );

const APIController = {
    getAllUsers : function( request, response ){
        UserModel.getUsers()
            .then( users => {
                let userWithoutPassword = users.map( user => {
                    // Map through comments here if you need to include comments too
                    return {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        userName : user.userName
                        //comments : user.comments
                    }
                } )
                response.status( 200 ).json( userWithoutPassword );
            });
    },
    getOneUser : function( request, response ){
        let userName = request.params.userName;
        UserModel.getUserById(userName)
            .then( data => {
                response.status( 200 ).json( data );
            });
    },
    deleteUser : function( request, response ){
        let userName = request.params.userName;

        UserModel
            .getUserById( userName )
            .then( user => {
                if( user === null ){
                    throw new Error( "That user doesn't exist" );
                }
                else{
                    UserModel
                        .deleteUserById( userName )
                        .then( result => {
                            console.log("I got here")
                            response.status( 204 ).end();
                        });
                }
            })
            .catch( error => {
                console.log("Error")
                response.statusMessage = error.message;
                response.status( 404 ).end();
            })

    },
    addNewUserAPI : function( request, response ){
        let userName = request.params.userName;
        let newUser = {
            userName : userName
        }
            UserModel
                .createUser( newUser )
                .then( user => {
                    console.log("Hello")
                    response.status( 201 ).json( user );
                });    
    },
    updateUser : function( request, response ){
        let { firstName, lastName, password } = request.body;
        let userName = request.params.userName;

        let fieldsToUpdate = {}

        if( firstName ){
            fieldsToUpdate.firstName = firstName;
        }

        if( lastName ){
            fieldsToUpdate.lastName = lastName;
        }

        if( password ){
            fieldsToUpdate.password = password;
        }
        
        if( Object.keys( fieldsToUpdate ).length === 0 ){
            response.statusMessage = "You need to provide at least one of the following fields to update the user ('userName', 'firstName', 'lastName', 'password')";
            response.status( 406 ).end();
        }
        else{
            UserModel
                .getUserById( userName )
                .then( user => {
                    if( user === null ){
                        throw new Error( "That user doesn't exist" );
                    }
                    else{
                        UserModel
                            .updateUser( userName, fieldsToUpdate )
                            .then( result => {
                                response.status( 202 ).json( result );
                            });
                    }
                })
                .catch( error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                })

        }
    }
}

module.exports = { APIController };


