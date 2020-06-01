const mongoose = require('mongoose');

const uri = process.env.DB_URL || "mongodb+srv://kotoha_CRUD:7kJNA0gTi4WnWCWG@mevn-database-vj6il.mongodb.net/kotoCRUDMEVN?retryWrites=true&w=majority"
const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};

module.exports = {
    mongo: async()=> {
        try {
            await mongoose.connect(uri, options)
            console.log("MongoResponse: conectado con exito");
            console.log("a: ",uri)
            return mongoose;
        }catch(e) {
            console.error(e);
        }
    }
}