const express = require('express');
const mongoose = require('./db');
const Post = require('./models/post');
const fileRouter = require('./file');
const path = require('path')

const app = express();

// Keep only these
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Mount fileRouter
app.use('/file', fileRouter);

app.use(express.static(path.join(__dirname, 'public')));




// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) res.render('post', { post });
  else res.status(404).send("Post not found.");
});

app.post('/create', async (req, res) => {
  const { title, summary, content, source } = req.body;
  await Post.create({ title, summary, content, source });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
