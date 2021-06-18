const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
  {
    id: uuid(),
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    id: uuid(),
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    id: uuid(),
    username: 'Sk8erBoi',
    comment: 'Plz delete your account, Todd',
  },
  {
    id: uuid(),
    username: 'onlysaywoof',
    comment: 'woof woof woof',
  },
];

app.get('/comments/show/:id', (req, res) => {
  const { id } = req.params;
  const requestedComment = comments.find((comment) => comment.id === id);
  res.render('comments/show', { requestedComment });
});

// get edit form
app.get('/comments/edit/:id', (req, res) => {
  res.render('/comments/edit');
});

// post edited comment to comments

// delete
// filter comment from array by it's id
// redirect back to index page

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({
    id: uuid(),
    username: username,
    comment: comment,
  });
  res.redirect('/comments');
});

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/', (req, res) => {
  res.render('comments/home');
});

app.listen(3000, () => {
  console.log('Server starting up!');
});

/*
Index Route (GET) - list all the comments - /comments
Create Route (POST) - Create a new comment - /comments
Show Route (GET) - Get one comment (using id) - /comments/:id
Update Route (PATCH) - Update one comment - /comments/:id
Delete Route (DELETE) - Destroy one comment - /comments/:id
*/
