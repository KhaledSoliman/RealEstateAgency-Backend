const express = require('express');
const router = express.Router();
const mysql = require('./../mysqlConnect');
const bcrypt = require('bcrypt');


//Login
router.post('/signin', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    mysql.query( `SELECT * FROM users WHERE username='${username}';`, (error, result) => {
        if (error) {
            console.log(error);
            res.status(404).end("The query is wrong!");
        }
        else if(result.length !== 0){
            bcrypt.compare(password, result[0].password, function(err, hashRes) {
                if(hashRes) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(401).end("Incorrect password");
                }
            });
        }
        else
            res.status(401).end("Username doesn't exist");
    });
});


/*
*   AUTH Sign Up
*/
router.post('/signup', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.fname + " " + req.body.lname;
    bcrypt.hash(password, 10, function(err, hash) {
        mysql.query( `INSERT INTO users (username, password, email, name) VALUES("${username}", "${hash}", "${email}", "${name}");`, (error, result) => {
            if (error) {
                console.log(error);
                res.status(401).end("Something wrong happened! Make sure your credentials are correct!");
            }
            else {
                res.status(200).end();
            }
        });
    });

});

////Add Fav Place
router.post('/favAdd', function(req, res, next) {
    const email = req.body.email;
    const fav = req.body.fav;


    mysql.query( `INSERT INTO favplaces (rideremail, place) VALUES("${email}", '${fav}');`, (error, result) => {
        if (error) {
            console.log(error);
            res.status(401).end("Couldn't Add Fav Place");
        }
        else {
            res.status(200).end("Added Fav Place");
        }
    });
});

////Remove Fav Place
router.post('/favRemove', function(req, res, next) {
    const email = req.body.email;
    const fav = req.body.fav;
    mysql.query( `DELETE FROM favplaces WHERE rideremail ="${email}" AND place= "${fav}" ;`, (error, result) => {
        console.log (email + fav);
        if (error) {
            console.log(error);
            res.status(401).end("Couldn't Remove Fav Place");
        }
        else {
            res.status(200).end("Removed Fav Place");
        }
    });
});

////Retrieve History
router.post('/history', function(req, res, next) {
    const email = req.body.email;
    mysql.query( `SELECT * FROM ride WHERE rideremail='${email}' OR driveremail='${email}';`, (error, result) => {
        if (error) {
            console.log(error);
            res.status(401).end("Couldn't Retrieve History");
        }
        else {
            if(result.length !== 0)
                res.status(200).json(result);
        }
    });
});

module.exports = router;