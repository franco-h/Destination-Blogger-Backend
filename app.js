let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
// Import Post and Contact Schema
let Post = require('./backend_model/post.model').Post;
let Contact = require('./backend_model/contact.model').Contact;
let uniqid = require("uniqid");
let app = express();

console.log(uniqid());

app.use(cors());
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:nelly12345@travel.qxbuv8f.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
// Generate unique id order for each JSON object
let id = 1;

/* METHODS FOR ARTICLES*/
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


/* METHODS FOR CONTACTS*/
app.get('/contacts', async (req, res) => {
    res.send(await Contact.find());
});

app.post('/contacts', async (req, res) => {
    let reqBody = req.body;
    let newContact = new Contact({
        id: uniqid(),
        name: reqBody.name,
        email: reqBody.email,
        message: reqBody.message,
        date: new Date()
    });
    await newContact.save();
    res.send('Message sent');
});

app.delete('/contacts/:id',  async (req, res) => {
    await Email.deleteOne({id: req.params.id});
    res.send('Message Deleted');
});

/*METHODS FOR DETAIL RENDERING*/
app.get('/detail', async (req, res) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    res.render('detail', {
        destination: post.destination,
        location: post.location,
        image: post.image,
        description: post.description
    })
})


app.use(express.static('client'));
app.get("")

let port = process.env.PORT || 3000;
app.listen(port,() => console.log('Server started on port ' + port));

