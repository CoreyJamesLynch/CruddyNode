const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
Index Route (GET) - list all the comments - /comments
Create Route (POST) - Create a new comment - /comments
Show Route (GET) - Get one comment (using id) - /comments/:id
Update Route (PATCH) - Update one comment - /comments/:id
Delete Route (DELETE) - Destroy one comment - /comments/:id
*/
