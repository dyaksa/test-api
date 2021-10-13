const mongoose = require('mongoose');

const options = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(`
mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ckvwl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,options)
.then(() => {
    console.log('MongoDB is connected')
}).catch(err => {
    console.log(err.message, 'MongoDB connection unsuccessful');
});

exports.connect = mongoose;