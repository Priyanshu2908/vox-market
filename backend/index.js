const express = require('express');
const userRouter = require('./routers/userRouter.js');
const cors = require('cors');

const app = express();

const port = 5000;

// middleware
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());
app.use('/user', userRouter);

app.listen(port, () => {
    console.log('server started');
});