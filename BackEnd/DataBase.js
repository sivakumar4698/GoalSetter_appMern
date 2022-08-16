const mongoose = require('mongoose')

const connectDatabase = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB Connect : ${connect.connection.host}`.cyan.underline)
    }
    catch(err){

        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDatabase;