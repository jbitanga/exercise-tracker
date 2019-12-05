const router = require('express').Router();
//Creating a route

let User = require('../models/user.model');
//Require the mongoose model

router.route('/').get((req, res) => {
//If its a slash and a get request --->

//Mongoose method that gets a list of users
    User.find()
    .then(users => res.json(users))
    //Returns list in JSON format
    .catch(err => res.status(400).json('Error: ' + err));
});
//First endpoint that handles incoming HTTP GET requests on the /users URL path

router.route('/add').post((req, res) => {
    //If its a slash and a post request --->

    const username = req.body.username;

    const newUser = new User({username});
    //Creates a new user in the DB

    newUser.save()
    //Saves the user
    .then(() => res.json('User added!'))
    //Returns a notifcation if the user is successfully added
    .catch(err => res.status(400).json('Error ' + err));

});

module.exports = router;