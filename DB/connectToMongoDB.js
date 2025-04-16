const mongoose = require('mongoose')

async function connectToMongoDB() {
    try {
        mongoose.connect(process.env.mongoUrl)
        console.log('Database Connected Successfully!')
    } catch(err) {
        console.error(err)
    }
}

module.exports = connectToMongoDB