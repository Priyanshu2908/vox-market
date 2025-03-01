const mongoose = require('mongoose');

const url = 'mongodb+srv://PriyanshuChaubey_29:Priyanshu2908@voxmarket.ualeh.mongodb.net/voxMarket?retryWrites=true&w=majority&appName=voxmarket'

mongoose.connect(url,)
.then((result) => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;