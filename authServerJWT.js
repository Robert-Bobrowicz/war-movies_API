require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {
    const userName = req.body.username;
    const user = { name: userName };
    const accessToken = generateAccessToken(user); //expires in specific time
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); //no expiration time, will manage manually

    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
});


app.listen(4004, () => console.log('Refresh token JWT Server runing & listening on port 4004'));


//generate token jwt
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};