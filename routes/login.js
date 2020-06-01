const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


const user = require('../models/user');

const _ = require('underscore');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/", async function(req, res) {

    const body = req.body;
    try {
        const userDB = await user.findOne({email: body.email}).lean().exec();

        if(!userDB) {
            return res.status(400).json({
                message:"Email not found",
                httpStatus: 400,
                error: ""
            })
        }

        //check password
        if(!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    message:"Email/password bad formed",
                    httpStatus: 400,
                    error: ""
                })   
        }
        //userDB.token = "dfasdfadfasdffads"
        const data = _.pick(userDB, ['email', 'name','_id','role','isActive','createdAt'])
        
        const token = jwt.sign({
            data: data
        }, "secret", {expiresIn: "1h"});
        res.json({
            message: "success login",
            httpStatus: 200,
            data: data,
            token: token
        })

    } catch (error) {
        console.error(error)
        return res.status(400).json(
            {
                httpStatus: 400,
                message: "error",
                error: error
            })
    }
});

module.exports = router;