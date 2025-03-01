const express = require('express');
const Model = require('../models/userModel')

const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
       console.log(err);
       res.status(500).json(err);
        
    });
});

// get all ,update , by id , delete

router.get('/getall', (req, res) => {

    Model.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err);
    });
});

// : denotes url parameter 
/*router.get('/getbycity/:city', (req,res) => {
    console.log(req.params.city);
    Model.find({ city : req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log();
            res.status(500).json(err);
        });
})*/

//get by email
router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);
    
    Model.findOne({email : req.params.email})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err);
    });
});

//get by id
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err);
    });
});

//update data by put
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
       console.log(err);
       res.status(500).json(err);
        
    });
});

// deletebyid
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err);
    });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result ){
            //generate token
            const {_id, name, email} =result;
            const payload = {_id,name,email};

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn : '1d'},
                (err, token) => {
                    if(err){
                        console.log(err);
                    }else{
                        res.status(200).json({ token });
                    }
                }
            )

        }else{
            res.status(401).json9({message : 'Invalid Credentials'})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;