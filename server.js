require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

//read data from a file
const users = JSON.parse(fs.readFileSync('./authorization/users.json'));

//save user to a file users.js
const saveUser = (data, path) => {
    if (users.users.find(user => user.name === data.users.name)) {
        console.log('User exists.');
    };
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error(err)
    }
};

//routes
//get all users
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

//add new user 
app.post('/users', async (req, res) => {
    if (users.users.find(user => user.name === req.body.name)) return res.send('User exists.');
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            name: req.body.name,
            password: hashedPassword,
            role: "standard"
        };
        users.users.push(user);
        saveUser(users, './authorization/users.json');
        res.status(201).send('New user added to DB.');
    } catch (err) {
        console.log('I do not know but I will.');
        res.status(500).send(err);
    }
});

//login user
app.post('/users/login', async (req, res) => {
    const user = users.users.find(user => user.name === req.body.name); console.log(user);
    if (!user) return res.status(400).send('Can not find user.');
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('User successfully logged in.');
        } else {
            res.send('Not allowed.');
        };
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5005, () => console.log('Server runing & listening on port 5005'));