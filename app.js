let express = require('express');
let app = express();
let mongoose = require('mongoose');
// Import Post Schema
let Post = require('./backend_model/post.model').Post;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:nelly12345@travel.qxbuv8f.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

app.get('/posts', async(req, res) => {
    let posts = await Post.find();
    res.send(posts);
});



app.use(express.static('client'));

app.listen(3000,() => console.log('Server started on port 3000'));

