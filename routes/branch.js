const express = require('express');
const router = express.Router();
const mysql = require('./../mysqlConnect');

/* GET home page. */
router.get('/', function (req, res, next) {
    mysql.query(`SELECT * FROM branches';`, (error, result) => {
        if (error) {
            console.log(error);
            res.status(404).end("The query is wrong!");
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
