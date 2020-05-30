const mongoose = require('mongoose');

const uri = "mongodb+srv://kotoha_CRUD:7kJNA0gTi4WnWCWG@mevn-database-vj6il.mongodb.net/kotoCRUDMEVN?retryWrites=true&w=majority"
const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};

module.exports = {
    mongo: async()=> {
        try {
            await mongoose.connect(uri, options)
            console.log("MongoResponse: conectado con exito");
            return mongoose;
        }catch(e) {
            console.error(e);
        }
    }
}