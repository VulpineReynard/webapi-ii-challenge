const express = require('express');
const dbFunc = require('./data/db');
const server = express();
server.use(express.json());

// run the find() method from helpers to get an initial
// array of posts to play with
let posts = [];
dbFunc.find()
  .then(res => {
    posts = res;
  });

// set an initial id number to start at for new posts being added
let postId = 10;

// SANITY CHECK
server.get('/', (req, res) => {
  res.status(200).json({ api: 'good response homie' });
});

// GET ALL POSTS
server.get('/api/posts', (req, res) => {

  res.status(200).json(posts);
});

// CREATE A NEW POST
server.post('/api/posts', (req, res) => {
  const newPost = req.body;

  //add the new id
  newPost.id = postId++;
  posts.push(newPost);

  res.status(201).json(posts);
});

// CREATE A NEW COMMENT FOR A POST
server.post('/api/posts/:id/comments', (req, res) => {
  // get the id of the requested post
  let id = req.params.id;

  dbFunc.insertComment(req.body);
  let newComments = dbFunc.findPostComments(id);
  
  res.status(201).json(newComments);
});

module.exports = server;