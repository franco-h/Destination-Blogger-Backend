let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
// Import Post Schema
let Post = require('./backend_model/post.model').Post;
let uniqid = require("uniqid");
let app = express();

console.log(uniqid());

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:nelly12345@travel.qxbuv8f.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
// Generate unique id order for each JSON object
let id = 1;

/* ALL POST METHODS*/
// Get all posts object and return them
app.get('/posts', async(req, res) => {
    let posts = await Post.find();
    res.send(posts);
});

//Use id to locate JSON object with same id in order to update
app.get('/posts/:id', async(req, res) => {
    let id = req.params.id;
    let post = await Post.findOne({id : id});
    res.send(post);
});

// Create a new post object
app.post('/posts', async(req, res) => {
    let reqBody = req.body;
    let newArticle = new Post({
        id: uniqid(),
        destination: reqBody.destination,
        location: reqBody.location,
        image: reqBody.image,
        description: reqBody.description
    });
    await newArticle.save();
    res.send("Created");
});

// Delete a post object based on id
app.delete('/posts/:id',async (req, res) =>{
    let id = req.params.id;
    await Post.deleteOne({id:id});
    res.send("Deleted");
});

// Edit a post object based on id
app.put('/posts/:id', async(req, res) => {
    let id = req.params.id;
    await Post.updateOne({id:id}, req.body);
    res.send("Edited");
});

app.use(express.static('client'));

let port = process.env.PORT || 3000;
app.listen(port,() => console.log('Server started on port ' + port));

