const express = require('express');
const router = express.Router();

//import the model of mongoose
const nota = require("../models/nota");

router.post("/notes", async function(req, res) {

    const body = req.body;
    try {
        const notaDB = await nota.create(body);
        res.status(200).json(notaDB);
    } catch(error) {
        console.error(error)
        return res.status(400).json({
            httpStatus: 400,
            message: "Error",
            data: error
        })
    }
})

router.get("/notes", async function(req, res) {
    try {
        const notaDB = await nota.find();
        res.json(notaDB);
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            httpStatus: 400,
            message: "Error",
            data: error
        })
    }
})

router.put("/notes/:id", async function(req, res) {
    const id = req.params.id;
    const body = req.body;
    try{
    const notaDB = await nota.findByIdAndUpdate(id,body, {new: true})
    res.json({
        httpStatus: 200,
        message: "success",
        data: notaDB
    })
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            httpStatus: 400,
            message: 'error',
            data: error
        })
    }
});

router.delete("/notes/:id", async function(req, res){
    const id = req.params.id;
    try {
        await nota.findByIdAndDelete(id, function(err, doc) {
            if(err) {
                return res.status(404).json({
                    httpStatus: 404,
                    message: "no id found",
                    data: err
                })
            }
            res.json({
                httpStatus: 200,
                message: "Se elimino correctamente",
                data: doc
            })
        });
        
    } catch (error) {
        console.error(error);
        res.status(400).json({
            httpStatus: 400,
            message: "Error",
            data: error
        })
    }
});
//get with params
router.get("/notes/:id", async function(req, res) {
    const id = req.params.id;
    try {
        const notaDB = await nota.findById(id);
        console.log(notaDB);
        res.json({
            httpStatus: 200,
            message: "success",
            data: notaDB});
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            httpStatus: 400,
            message: "ERROR",
            data: error
        })
    }
})

module.exports = router;