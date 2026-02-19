const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const app = express();

// Carreguem les dades dels fitxers JSON (a "lo bèstia")
const site = JSON.parse(fs.readFileSync('./server/data/site.json', 'utf8'));
const ciutats = JSON.parse(fs.readFileSync('./server/data/cities.json', 'utf8'));
const paisos = JSON.parse(fs.readFileSync('./server/data/countries.json', 'utf8'));

// Configurem el motor de plantilles HBS
app.set('view engine', 'hbs');
app.set('views', './server/views');
hbs.registerPartials('./server/views/partials');

// PUNT D: El helper per comparar si un número és menor o igual
hbs.registerHelper('lte', function (a, b) {
    return a <= b;
});

// Fem que la carpeta public sigui accessible (pel CSS)
app.use(express.static('public'));

// PUNT B: Ruta principal
app.get('/', (req, res) => {
    res.render('index', site);
});

// PUNT C: Ruta de l'informe (ajuntem les dades aquí mateix)
app.get('/informe', (req, res) => {
    res.render('informe', {
        site: site,             // Ara 'site' conté tot el site.json
        cities: ciutats.cities, // Canviem 'llista' per 'cities'
        countries: paisos.countries // Canviem 'nomsPaisos' per 'countries'
    });
});

app.listen(3000, () => console.log('Servidor en marxa a http://localhost:3000'));