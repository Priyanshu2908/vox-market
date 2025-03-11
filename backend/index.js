const express = require('express');
const userRouter = require('./routers/userRouter');
const sellerRouter = require('./routers/sellerRouter');
const contactusRouter = require('./routers/contactusRouter');
const productRouter = require('./routers/productRouter');


const cors = require('cors');

const app = express();

const port = 5001;

// middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/Contact', contactusRouter);
app.use('/product', productRouter);



app.listen(port, () => {
    console.log('server started');
});
//
// Compare this snippet from backend/routers/userRouter.js:
//
// const router = express.Router();
//
// const jwt = require('jsonwebtoken');
// const verifyToken = require('../middlewares/verifyToken');
// require('dotenv').config();