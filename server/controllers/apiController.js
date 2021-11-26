const {TaskModel} = require( './../models/taskModel' );

const APIController = {
    getAll : function( request, response ){
        TaskModel.getAll()
            .then( tasks => {
                response.status( 200 ).json( tasks );
            });
    },
    getOneTask : function( request, response ){
        let id = request.params.id;
        console.log(id);
        TaskModel.getOneById({ _id: id})
            .then( data => {
                response.status( 200 ).json( data );
            });
    },
    addNewTask : function( request, response ){
        let { title, description, completed } = request.body;

        if( title && description){
            let newTask = {
                title,
                description,
                completed
            };

            TaskModel
                .create( newTask )
                .then( task => {
                    response.status( 201 ).json( task );
                });
        }
        else{
            response.statusMessage = "You are missing a field to create a new task ('title', 'description', 'completed')";
            response.status( 406 ).end();
        }      
    },
    deleteOne : function( request, response ){
        let id = request.params.id;

        TaskModel
            .getOneById( {_id : id} )
            .then( task => {
                if( task === null ){
                    throw new Error( "That task doesn't exist" );
                }
                else{
                    TaskModel
                        .deleteOne({ _id: id})
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
    updateTask : function( request, response ){
        let { title, description, completed } = request.body;
        let id = request.params.id;

        let fieldsToUpdate = {}

        if( title ){
            fieldsToUpdate.title = title;
        }

        if( description ){
            fieldsToUpdate.description = description;
        }

        if( completed ){
            fieldsToUpdate.completed = completed;
        }
        if( Object.keys( fieldsToUpdate ).length === 0 ){
            response.statusMessage = "You need to provide at least one of the following fields to update the task ('title', 'description', 'completed')";
            response.status( 406 ).end();
        }
        else{
            // fieldsToUpdate.updated_at = Date.now;
            TaskModel
                .getOneById({ _id: id} )
                .then( task => {
                    if( task === null ){
                        throw new Error( "That task id doesn't exist" );
                    }
                    else{
                        TaskModel
                            .updateOne( id, fieldsToUpdate )
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


