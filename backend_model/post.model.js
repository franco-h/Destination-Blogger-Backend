let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    // id for reference in update and delete functionality
    id: String,
    destination: String,
    Location: String,
    description: String
});

// Create post
let Post = mongoose.model('Post', postSchema);

//export the model above
module.exports = { Post }