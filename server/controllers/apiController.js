const { UserModel } = require('../models/userModel')
const bcrypt = require('bcrypt');
const { PostModel, Post } = require('../models/PostModel');

const APIController = {
    getAll: function (request, response) {
        UserModel.getAll()
            .then(users => {
                let userWithoutPassword = users.map(user => {
                    return {
                        id: user._id,
                        firstName: user.firstName,
                        userName: user.userName,
                        posts: user.posts
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
                    userName: user.userName,
                    posts: user.posts
                }
                response.status(200).json(userWithoutPassword);
            });
    },
    getOnePost: function (request, response) {
        let id = request.params.id;
        PostModel.getOneById(id)
            .then(post => {
                response.status(200).json(post);
            });
    },
    getOneByUserName: function (request, response) {
        let id = request.params.id;
        UserModel.getOneByUserName(id)
            .then(user => {
                let userWithoutPassword = {
                    id: user._id,
                    firstName: user.firstName,
                    userName: user.userName,
                    posts: user.posts
                }
                response.status(200).json(userWithoutPassword);
            });
    },
    addNew: function (request, response) {
        console.log(request.body, "In in the server side");
        let { firstName, userName, password, confirmPassword } = request.body;

        if (firstName && userName && password && confirmPassword) {
            if (password === confirmPassword) {
                bcrypt.hash(password, 10)
                    .then(encryptedPassword => {
                        const newUser = {
                            firstName,
                            userName,
                            password: encryptedPassword
                        };
                        UserModel
                            .create(newUser)
                            .then(user => {
                                request.session._id = user.id;
                                request.session.firstName = user.firstName;
                                request.session.userName = user.userName;
                                request.session.posts = user.posts;
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
            response.statusMessage = "You are missing a field to create a new user ('userName', 'firstName', 'password')";
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
    deletePost: function (request, response) {
        const id = request.params.id
        const userName = request.body.userName;
        console.log(id, "Postid", userName, "username")

        UserModel.getOneByUserName(userName).then((user) => {
            const removePost = user.posts.filter(post => post._id.toString() !== id);
            console.log("remove items", { inconmingId: id, removePost });
            user.posts = removePost;
            UserModel.updateOne(user._id, user).then((UpdatedUser) => {
                response.status(200).json(UpdatedUser);
            });
        });
    },

    updateOne: function (request, response) {
        console.log(request.body);
        let { firstName, userName, password } = request.body;
        let id = request.params.id;

        let fieldsToUpdate = {}

        if (firstName) {
            fieldsToUpdate.firstName = firstName;
        }

        if (lastName) {
            fieldsToUpdate.userName = userName;
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
        let email = request.body.loginUserName;
        let password = request.body.loginPassword;
        console.log("Im here")
        UserModel
            .getOneByUserName(email)
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
                        request.session.userName = result.userName;
                        request.session.posts = result.posts;

                        let currentUser = {
                            id: result.id,
                            firstName: result.firstName,
                            userName: result.userName,
                            posts: result.posts
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
        if (request.session.userName &&
            request.session.firstName) {
            let currentUser = {
                id: request.session.id,
                userName: request.session.firstName,
                firstName: request.session.firstName,
                posts: request.session.posts
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
    addNewPost: function (request, response) {
        let { title, options } = request.body;
        console.log("Here in addnewBicycle", request.body);
        let userName = request.session.userName;
        console.log("userName in addNew", userName)
        if (title && options) {
            options.forEach(optionObj => {
                console.log(optionObj.option.length);
                    if (optionObj.option.length < 3) {
                        response.statusMessage = "Every option must be al least 3 characters long";
                        response.status(406).end();
                    }
            });
            const newPost = {
                title,
                options,
            };
            console.log(newPost);

            UserModel
                .getOneHopeWorks({ userName: userName })
                .then(userResult => {
                    console.log("This is user result", userResult)
                    UserModel
                        .AddPostToUser(userResult._id, newPost)
                        .then(result => {
                            console.log("this is the final result", result)
                        });
                });
        }
        else {
            response.statusMessage = "You are missing a field to create a new post";
            response.status(406).end();
        }
    },
    updateVotes: function(request, response) {
        const postToUpdate = request.body;
        console.log("postToUpdate", postToUpdate);
        response.status(200).end();

        PostModel
        .updatePost(postToUpdate._id, postToUpdate)
        .then(result => {
            response.status(202).json(result);
        }).catch(error => {
            response.statusMessage = error.message;
            response.status(404).end();
        });
    }

}

module.exports = { APIController };


