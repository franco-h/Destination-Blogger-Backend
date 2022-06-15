let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contactSchema = new Schema({
    id: String,
    email: String,
    name: String,
    message: String,
    date: Date
});

let Contact = mongoose.model('Contact', contactSchema, 'Contact');

module.exports = { Contact};