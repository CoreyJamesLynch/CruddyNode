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

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.get('/comments/edit/:id', (req, res) => {
  const { id } = req.params;
  const editedComment = comments.find((comment) => comment.id === id);
  res.render('comments/edit', { editedComment });
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const requestedComment = comments.find((comment) => comment.id === id);
  res.render('comments/show', { requestedComment });
});

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { edit_text_area } = req.body;
  const editedComment = comments.find((comment) => comment.id === id);
  editedComment.comment = edit_text_area;
  res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((comment) => comment.id !== id);
  res.redirect('/comments');
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
