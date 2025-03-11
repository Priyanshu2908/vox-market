const express = require('express');
const Model = require('../models/productModel');
const verifyToken = require('../middlewares/verifyToken');


const router = express.Router();



//add
router.post('/add', verifyToken, (req, res) => {
    req.body.seller = req.user._id;
    const model = new Model(req.body);
    model.save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getall
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});





//delete
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




module.exports = router;