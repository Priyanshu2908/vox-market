const mongoose = require('mongoose');

const url = 'mongodb+srv://PriyanshuChaubey29:Priyanshu2908@cluster0.mjm3gew.mongodb.net/voxMarket?retryWrites=true&w=majority'

mongoose.connect(url,)
.then((result) => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;