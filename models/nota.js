const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    name: {type: String, required:[true, "the name is required"] },
    description: String,
    userId: String,
    dateAdded: { type: Date, default: Date.now },
    isActive: {type: Boolean, default: true}
});

const noteModel = mongoose.model('notes',notaSchema);

module.exports = noteModel