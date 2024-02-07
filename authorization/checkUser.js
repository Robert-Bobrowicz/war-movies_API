//middleware to check user (is in DB or not)
const fs = require('fs');

async function checkUser(req, res, next) {
    const users = await JSON.parse(fs.readFileSync('./authorization/users.json'));
    const userName = req.body.name;
    if (userName) {
        req.user = users.users.find(user => user.name === userName);
        console.log(req.user);
    }
    next();
};


module.exports = {
    checkUser
}