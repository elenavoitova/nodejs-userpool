let mongoose = require('mongoose');
let User = require('../models/user');
/*
 * GET /user route to retrieve all the users.
 */
function getUsers(req, res) {
    //Query the DB and if no errors, send all the users
    let query = User.find({});
    query.exec((err, users) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(users);

        console.log("users" + users);
        console.log(users)
    });
}


/* GET /usercount route to retrieve all the users.
 */
function getCount(req, res) {
    //Query the DB and if no errors, send all the users
    let query = User.count({});
    query.exec((err, c) => {
        if(err) res.send(err);
        res.json(c);
    });
}

/*
 * GET /nextuser route to retrieve all the users.
 */
let id = 1;
function getNextUsers(req, res) {
    let count;
    let q = User.count({});
    q.exec((err, c) => {
        if(err) res.send(err);
        //res.json(c);
        count = c;
    });

    User.findById(id, (err, user) => {

        if(err) res.send(err);

        //If no errors, send it back to the client
        if (user === null){
            res.json(user);
            //id = 1;
        }
        //res.json("Sorry, my friend!");

        if (id === count) {
            id = 1;
        } else {
            id++;
        }

        res.json(user);
    });
}

/*
 * POST /user to save a new user.
 */
function postUser(req, res) {
    //Creates a new user

    let newUser = new User(req.body);
    //Save it into the DB.
    newUser.save((err, user) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "User successfully added!", user});
        }
    });
}

/*
 * GET /user/:id route to retrieve a user given its id.
 */
function getUser(req, res) {
    User.findById(req.params.id, (err, user) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(user);
    });
}

/*
 * DELETE /user/:id to delete a user given its id.
 */
function deleteUser(req, res) {
    User.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "User successfully deleted!", result });
    });
}

/*
 * PUT /user/:id to updatea a user given its id
 */
function updateUser(req, res) {
    User.findById({_id: req.params.id}, (err, user) => {
        if(err) res.send(err);
        Object.assign(user, req.body).save((err, user) => {
            if(err) res.send(err);
            res.json({ message: 'User updated!', user });
        });
    });
}

function getSampleParam(req, res) {
    User.find().byUsername('user22').exec(function (err, user) {
        if(err) res.send(err);
        console.log(user.password);
        res.json(user);
    })

    /*
    var query = User.findOne({'username' : 'user22'});
    query.select('password createdAt');

    query.exec(function (err, user) {
        if(err) res.send(err);
        console.log(user.password);
        res.json(user);
    })
    */

    /*
    User.findOne(
        { 'username' : 'user22'},
        '_id password',
        function (err, user) {
            if(err) res.send(err);
            console.log(user.password);
            res.json(user);

        }
    )
    */
}

//export all the functions
module.exports = { getUsers, postUser, getUser, deleteUser, updateUser, getNextUsers, getCount, getSampleParam };