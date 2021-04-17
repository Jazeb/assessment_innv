const mongoose = require('mongoose').set('debug', false);
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Films = require('./Films');
const User = require('./User');
const authUser = require('./auth');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.status(200).json({ status: true, message: 'server is running' }));
app.get('/films', async (req, res) => {
    const films = await Films.find({});
    return res.json(films);
})

app.get('/films/:id', async (req, res) => {
    const { id } = req.params;
    const films = await Films.findById({ _id: id });
    return res.status(200).json(films)
})

app.post('/film', async (req, res) => {
    const film = new Films(req.body);
    film.save((err, doc) => {
        if (err) return res.json(err);
        else return res.status(200).json({ status: true, msg: 'Film saved successfully' });
    });
});

app.post('/user/register', async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    let { user_name, password } = req.body;
    password = await bcrypt.hash(password, salt);

    const token = jwt.sign(JSON.stringify({ user_name, password }), 'SECRET');

    const user = new User({ user_name, password });
    user.save((err, doc) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json({ msg: 'User saved successfully', token, status:true })
    });
});

app.post('/film/comment', authUser, async (req, res) => {
    let { comment, movie_id } = req.body;
    let { user_name } = req.user;
    let film = await Films.findById({ _id: movie_id });

    film.comments.push({ comment: comment, name: user_name });
    film.save((err, doc) => {
        if (err) return res.json(err);
        else return res.status(200).send('Comment added');
    });
});

app.listen(3000, () => console.log('Server is running...'));

const mongo_connection = 'mongodb+srv://jazeb_007:!password@apicluster.ycxnc.mongodb.net/films?retryWrites=true&w=majority'

mongoose.connect(mongo_connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb connected...'))
    .catch((err) => console.log(err));

module.exports = app;