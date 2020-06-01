const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRound = 10;
const user = require("../models/user");
const _ = require('underscore');
const { checkAuth, checkAdmin } = require('../middlewares/auth');

//post
router.post("/users", async function(req, res) {

    const body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    body.password = bcrypt.hashSync(req.body.password, saltRound)

    try {
        const userDB = await user.create(body);
        res.json({
            message:"a user has been created.",
            httpStatus: 200,
            data: userDB
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "an error has ocurred",
            error
        })
    }
});

//PUT users
router.put("/users/:id", [checkAuth, checkAdmin], async function(req, res) {
    
    const _id = req.params.id;
    const body = _.pick(req.body, ['name','email','password','isActive']);
    
    if(body.password) {
        body.password = bcrypt.hashSync(body.password, saltRound);
    }
 
    try {
        const userDB = await user.findByIdAndUpdate(_id, body,{new: true, runValidators: true})
        return res.json({
            httpStatus: 200,
            message: "success",
            data: userDB
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            httpStatus: 400,
            message:"error",
            error: error
        })
    }
});

module.exports = router