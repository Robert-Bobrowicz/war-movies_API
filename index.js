require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { log } = require('console');
const {
    getHashes,
    createHash
} = require('node:crypto');
const bcrypt = require('bcrypt');
const { checkUser } = require('./authorization/checkUser');
const { authUser, authUserRole } = require('./authorization/userAuth');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());
app.use(checkUser);


const users = JSON.parse(fs.readFileSync('./authorization/users.json')); console.log(users);

const moviesDB = {
    listName: 'Ulubione',
    movies: [
        { id: 123, title: 'Kompania braci', year: '2001' },
        { id: uuidv4(), title: 'Oddział bohaterów', year: '2013' },
        { id: uuidv4(), title: 'Pacyfik', year: '2010' },
        { id: uuidv4(), title: 'Mistrz' },
        { id: uuidv4(), title: 'Narwik', year: '2022' },
        { id: uuidv4(), title: 'II Wojna Światowa. Historie z frontu', year: '2023' },
        { id: uuidv4(), title: 'Wojna na pełnym morzu' },
        { id: uuidv4(), title: 'Najważniejsze wydarzenia II Wojny Światowej' },
        { id: uuidv4(), title: 'II Wojna Światowa. Droga do zwycięstwa' },
        { id: uuidv4(), title: 'Medal honoru' },
        { id: uuidv4(), title: 'Moja przyjaciółka Anne Frank' },
        { id: uuidv4(), title: 'Droga Hitlera do władzy' },
        { id: uuidv4(), title: 'Thirteen hours that saved Britain' },
        { id: uuidv4(), title: 'Najpierw zabili mojego ojca' },
        { id: uuidv4(), title: '1939', year: '1989' },
        { id: uuidv4(), title: 'Einsatzgruppen. Brygady śmierci' },
        { id: uuidv4(), title: 'Vittorio de Sica i jego życie' },
        { id: uuidv4(), title: 'Miasto 44' },
        { id: uuidv4(), title: 'Battle of Dunkirk' },
        { id: uuidv4(), title: 'Raport Pileckiego' },
        { id: uuidv4(), title: 'Szeregowiec Ryan' },
        { id: uuidv4(), title: 'Chłopiec w pasiastej piżamie' },
        { id: uuidv4(), title: 'Zapomniana bitwa' },
        { id: uuidv4(), title: 'Zwykli ludzie' },
        { id: uuidv4(), title: 'Pokonani' },
        { id: uuidv4(), title: 'Pilecki' },
        { id: uuidv4(), title: 'Czterej pancerni i pies' },
        { id: uuidv4(), title: 'Wróg u bram' },
        { id: uuidv4(), title: 'Cienka czerwona linia' },
        { id: uuidv4(), title: 'Złodziejka książek' },
        { id: uuidv4(), title: 'Pianista' },
        { id: uuidv4(), title: 'Odpuść nam nasze winy' },
        { id: uuidv4(), title: 'Czas wojny' },
        { id: uuidv4(), title: 'Jojo rabbit' },
        { id: uuidv4(), title: 'Życie jest piękne' },
        { id: uuidv4(), title: 'Żelazny krzyż' },
        { id: uuidv4(), title: 'Kobieta w Berlinie' },
        { id: uuidv4(), title: 'Parszywa dwunastka' },
        { id: uuidv4(), title: 'Działa Navarony' },
        { id: uuidv4(), title: 'Tylko dla orłów' },
        { id: uuidv4(), title: 'Bohaterowie telemarku' },
        { id: uuidv4(), title: 'Komandosi z Navarony' },
        { id: uuidv4(), title: 'Most na rzece Kwai' },
        { id: uuidv4(), title: 'Tobruk' },
        { id: uuidv4(), title: 'Wybór króla' },
        { id: uuidv4(), title: 'Wojna zimowa' },
        { id: uuidv4(), title: 'Idź i patrz' },
        { id: uuidv4(), title: 'Most' },
        { id: uuidv4(), title: 'Okręt' },
        { id: uuidv4(), title: 'Pluton' },
        { id: uuidv4(), title: 'My honor was loyalty' },
        { id: uuidv4(), title: 'Pearl Harbor' },
        { id: uuidv4(), title: 'Dywizjon 303. Historia prawdziwa' },
        { id: uuidv4(), title: 'Tajemnica Westerplatte' },
        { id: uuidv4(), title: 'Eskadra Czerwone ogony' },
        { id: uuidv4(), title: 'Flyboys' },
        { id: uuidv4(), title: 'Bitwa o Sewastopol' },
        { id: uuidv4(), title: '9 kompania' },
        { id: uuidv4(), title: 'Lecą żurawie' },
        { id: uuidv4(), title: 'Nieznana bitwa' },
        { id: uuidv4(), title: 'Ocalić Leningrad' },
        { id: uuidv4(), title: 'Bitwa o Midway' }
    ]
};

app.get('/', (req, res) => {
    res.send("Main page of War Movies");
});

app.get('/movies', authUser, authenticateToken, (req, res) => {
    res.send(moviesDB);
});

app.get('/movies/:id', authUser, (req, res) => {
    const movie = moviesDB.movies.find(movie => movie.id === parseInt(req.params.id));
    if (!movie) res.status(404).send(`The movie with given id = ${req.params.id} was not found in our movies database.`);

    res.status(200).send(movie);
});

app.post('/users', async (req, res) => {
    const user = {
        name: req.body.name,
        password: req.body.password
    };
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const path = './authorization/users.json';
    user.password = hashedPassword;
    users.users.push(user);
    console.log(users);

    storeUser(users, path);

    res.send('User added');
});

app.post('/users/login', async (req, res) => {
    const user = users.users.find(user => user.name === req.body.name);
    console.log(user);
    if (!user) return res.status(400).send('Can not find user');
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // const userToAccess = { name: user.name }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken, status: 'Success' });
        } else {
            res.send('Not allowed.')
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Smth went wrong.');
    }



});

//request params 
app.get('/users/:name/:password', (req, res, next) => { console.log('this is middleware for the user'); next() }, async (req, res) => {
    try {
        const user = req.params;
        const name = user.name; console.log(name);
        let password = user.password;

        //hash password using crypto
        const hashAlgorithm = 'sha256';

        function hash(content, algorithm) {
            const hashed = createHash(algorithm).update(content).digest('hex');
            return hashed;
        };

        const hashedPassword1 = await hash(password, hashAlgorithm); console.log(hashedPassword1);

        //hash password using bcrypt
        const hashedPassword2 = await bcrypt.hash(password, 12); console.log(hashedPassword2);

        const reply = {
            user: name,
            password1: hashedPassword1,
            password2: hashedPassword2
        }

        res.send(reply).status(201);
    } catch (err) {
        console.log(err);
        res.status(500).send('Smth went wrong.')
    }
});

app.get('/users/admin', authUser, authUserRole('admin'), (req, res) => {
    res.status(200).send('Admin page');
});


app.listen(3003, () => console.log('Server runing & listening on port 3003'));



const year = moviesDB.movies.map(el =>
    (!el.year) ? { ...el, year: '' } : el
);

moviesDB.movies = year;
// if (!year.year) console.log(year);
// console.log(moviesDB);

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
};

const path = './data/moviesDB.json';

storeData(moviesDB, path);


//save user to a file users.js
const storeUser = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error(err)
    }
};


//middleware authenticate token jwt
function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Not authorized.');
        if (user.name !== req.user.name) return res.status(403).send('Not authorized user.');
        req.user = user;
        console.log('From token verify: ', user);
        next();
    })
    console.log(token);
}