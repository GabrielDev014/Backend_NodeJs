const mongoose = require("mongoose")
require('dotenv').config();

try
{
    const uri = process.env.MONGODB_URI

    mongoose.connect(uri)
}
catch(err)
{
    console.log(err)
}

mongoose.Promise = global.Promise
module.exports = mongoose

