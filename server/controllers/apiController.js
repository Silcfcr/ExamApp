const { BicycleModel } = require('../models/BicycleModel');
const { UserModel } = require('../models/userModel')
const bcrypt = require('bcrypt');

const APIController = {
    getAll: function (request, response) {
        UserModel.getAll()
            .then(users => {
                let userWithoutPassword = users.map(user => {

                    return {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        bicycles: user.bicycles
                    }
                })
                response.status(200).json(userWithoutPassword);
            });
    },
    getOne: function (request, response) {
        let id = request.params.id;
        UserModel.getOneById(id)
            .then(user => {
                let userWithoutPassword = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    bicycles: user.bicycles
                }
                response.status(200).json(userWithoutPassword);
            });
    },
    getOneByEmail: function (request, response) {
        let id = request.params.id;
        UserModel.getOneByEmail(id)
            .then(user => {
                let userWithoutPassword = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    bicycles: user.bicycles
                }
                response.status(200).json(userWithoutPassword);
            });
    },
    addNew: function (request, response) {
        console.log(request.body, "In in the server side");
        let { firstName, lastName, email, password, confirmPassword } = request.body;

        if (firstName && lastName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                bcrypt.hash(password, 10)
                    .then(encryptedPassword => {
                        const newUser = {
                            email,
                            firstName,
                            lastName,
                            password: encryptedPassword
                        };
                        UserModel
                            .create(newUser)
                            .then(user => {
                                request.session._id = user.id;
                                request.session.firstName = user.firstName;
                                request.session.lastName = user.lastName;
                                request.session.email = user.email;
                                request.session.bicycles = user.bicycles;
                                console.log(request.session);
                                response.status(201).json(user);
                            })
                    });
            } else {
                response.statusMessage = "Password and password confirmation don't match";
                response.status(406).end();
            }
        }
        else {
            response.statusMessage = "You are missing a field to create a new user ('userName', 'firstName', 'lastName', 'password')";
            response.status(406).end();
        }
    },
    deleteOne: function (request, response) {
        let id = request.params.id;
        console.log(id);

        UserModel
            .getOneById(id)
            .then(data => {
                console.log(data);
                if (data === null) {
                    throw new Error("That user doesn't exist");
                }
                else {
                    UserModel
                        .deleteOne({ _id: id })
                        .then(result => {
                            console.log("I got here")
                            response.status(204).end();
                        });
                }
            })
            .catch(error => {
                console.log("Error")
                response.statusMessage = error.message;
                response.status(404).end();
            })
    },
    deleteBicycle: function (request, response) {
        const id = request.params.id;
        console.log(id, "Id of bike to delete");
        UserModel.findOneBicycle(id).then((data) => {
            console.log({data});
            response.status(200).end();
            // BicycleModel
            // .deleteOne(id)
            // .then(result => {
            //     console.log("I deleted bike", result)
            //     response.status(204).end();
            // });
        })
    },

    updateOne: function (request, response) {
        console.log(request.body);
        let { firstName, lastName, password } = request.body;
        let id = request.params.id;

        let fieldsToUpdate = {}

        if (firstName) {
            fieldsToUpdate.firstName = firstName;
        }

        if (lastName) {
            fieldsToUpdate.lastName = lastName;
        }

        if (password) {
            bcrypt.hash(password, 10)
                .then(encryptedPassword => {
                    fieldsToUpdate.password = encryptedPassword;
                });
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            response.statusMessage = "You need to provide at least one of the following fields to update the user ('userName', 'firstName', 'lastName', 'password')";
            response.status(406).end();
        }
        else {
            UserModel
                .getOneById(id)
                .then(user => {
                    if (user === null) {
                        throw new Error("That user doesn't exist");
                    }
                    else {
                        UserModel
                            .updateOne(id, fieldsToUpdate)
                            .then(result => {
                                response.status(202).json(result);
                            });
                    }
                })
                .catch(error => {
                    response.statusMessage = error.message;
                    response.status(404).end();
                })

        }
    },
    userLogin: function (request, response) {
        let email = request.body.loginEmail;
        let password = request.body.loginPassword;
        console.log("Im here")
        UserModel
            .getOneByEmail(email)
            .then(result => {
                if (result === null) {
                    throw new Error("That user doesn't exist!");
                }
                bcrypt.compare(password, result.password)
                    .then(flag => {
                        if (!flag) {
                            throw new Error("Wrong credentials!");
                        }
                        request.session.id = result._id;
                        request.session.firstName = result.firstName;
                        request.session.lastName = result.lastName;
                        request.session.email = result.email;
                        request.session.bicycles = result.bicycles;

                        let currentUser = {
                            id: result.id,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            email: result.email,
                            bicycles: result.bicycles
                        }
                        response.status(200).json(currentUser);
                    })
                    .catch(error => {
                        response.statusMessage = error.message;
                        response.status(406).end()
                    });
            })
            .catch(error => {
                response.statusMessage = error.message;
                response.status(404).end();
            });
    },
    validateUser: function (request, response) {
        if (request.session.id &&
            request.session.email &&
            request.session.firstName &&
            request.session.lastName && request.session.bicycles) {
            let currentUser = {
                id: request.session.id,
                email: request.session.email,
                lastName: request.session.lastName,
                firstName: request.session.firstName,
                bicycles: request.session.bicyles
            }
            response.status(200).json(currentUser);
        }
        else {
            response.statusMessage = "You need to login to be here!";
            response.status(401).end();
        }
    },
    userLogout: function (request, response) {
        console.log("Im getting to llogout")
        request.session.destroy();
        response.status(200).json({ message: "Successfuly destroyed session" });
    },
    addNewBicycle: function (request, response) {
        let { title, description, price, location, imageUrl } = request.body;
        console.log("Here in addnewBicycle", request.body);
        let email = request.params.email;
        console.log("email in addNew", email)
        if (title && description && price && location && imageUrl) {
            const newBicycle = {
                title,
                description,
                price,
                location,
                imageUrl
            };
            console.log(newBicycle);

            BicycleModel
                .createBicycle(newBicycle)
                .then(data => {
                    UserModel
                        .AddBicycleToUser(email, newBicycle)
                        .then(data => {
                            if (data === null) {
                                console.log("Hihi")
                                throw new Error("Error adding bike to user");
                            }
                            else {
                                console.log(data);
                                response.status(201).json(data);
                            }
                        });
                    response.status(201).json(data);
                });

        }
        else {
            response.statusMessage = "You are missing a field to create a new bike";
            response.status(406).end();
        }
    }
}

module.exports = { APIController };


