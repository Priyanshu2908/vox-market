const express = require('express');
const Model = require('../models/sellerModel');

const router = express.Router();

const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        // Check if email already exists
        const existingSeller = await Model.findOne({ email: req.body.email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newSeller = new Model(req.body);
        const savedSeller = await newSeller.save();
        
        // Don't send password in response
        const { password, ...sellerData } = savedSeller.toObject();
        res.status(201).json(sellerData);
    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: Object.values(err.errors).map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Error creating seller account' });
    }
});

//getall
router.get('/getall',  (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});

// : denotes url parameter
router.get('/getbycity/:city', (req, res) => {
    console.log(req.params.city);
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});

// email
router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);
    Model.findOne({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

})


//getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update
router.put('/update/:id', (req, res) => {

    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })

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

router.post('/authenticate', async (req, res) => {
    try {
        const seller = await Model.findOne({ email: req.body.email });
        if (!seller) {
            return res.status(401).json({ message: 'Email not found' });
        }

        const isValidPassword = await seller.isValidPassword(req.body.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // generate token
        const { _id, name, email } = seller;
        const payload = { _id, name, email, role: 'seller' };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;