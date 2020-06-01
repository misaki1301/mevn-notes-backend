const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['ADMIN','USER'],
    message: "{VALUE} role not valid"
}
const userSchema = new Schema({
    name: { type: String, required: [true, "name is required"] },
    email: { 
        type: String, 
        required: [true, "email is required"],
        unique: true
    },
    password: { type: String, required: [true, "password is required"] },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: 'USER', enum: roles },
    isActive: { type: Boolean, default: true }
});

userSchema.plugin(uniqueValidator, { message: "Error: expected {PATH} to be unique" });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('users', userSchema);

module.exports = User