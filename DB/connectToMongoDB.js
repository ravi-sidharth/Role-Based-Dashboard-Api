const mongoose = require('mongoose')

async function connectToMongoDB() {
    return mongoose.connect(process.env.mongoUrl)
}

module.exports = connectToMongoDB