const mongoose = require('mongoose')

function ConnectDB() {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error", err);

        })
}

module.exports = ConnectDB;