const express = require('express');
const dbFunc = require('./data/db');

// run the find() method from helpers to get an initial
// array of posts to play with
let posts = [];
dbFunc.find()
  .then(res => {
    posts = res;
  })

console.log(posts);

const server = express();
server.use(express.json());

module.exports = server;