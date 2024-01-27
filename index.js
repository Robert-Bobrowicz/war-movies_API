const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


app.use(cors());


const moviesDB = {
    listName: 'Ulubione',
    movies: [
        { id: uuidv4(), title: 'Kompania braci', year: '2001' },
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
    res.send("Server War Movies");
});

app.get('/movies', (req, res) => {
    res.send(moviesDB);
});

app.get('/movies/:id', (req, res) => {
    const movie = moviesDB.movies.find(movie => movie.id === parseInt(req.params.id));
    if (!movie) res.status(404).send(`The movie with given id = ${req.params.id} was not found in our movies database.`);

    res.status(200).send(movie);
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