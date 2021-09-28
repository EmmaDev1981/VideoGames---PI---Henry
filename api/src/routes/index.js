require('dotenv').config();
const { APIKEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// GET a '/videogames
router.get('/videogames', async (req, res) => {
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parseamos el objeto recibido de findAll porque es una referencia circular (?)
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    //Aca dejamos el arreglo de generos plano con solo los nombres de cada genero
    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
        ...el,
        genres: el.genres.map(g => g.name)
    }), [])
    
    if (req.query.name) {
        try {
            let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${APIKEY}`);
            if (!response.data.count) return res.status(404).send(`No se encontro ningun videojuego con el nombre "${req.query.name}"`);
            response.data.results = response.data.results.reduce((acc, el) => acc.concat({
                ...el,
                genres: el.genres.map(g => g.name)
            }), [])
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            const results = [...filteredGamesDb, ...response.data.results.splice(0, 15)];
            return res.json(results)
        } catch (err) {
            return console.log(err)
        }
    } else {
        try {
            let pages = 0;
            let results = [...videogamesDb];
            let response = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
            while (pages < 6) {
                pages++;
                response.data.results = response.data.results.reduce((acc, el) => acc.concat({
                    ...el,
                    genres: el.genres.map(g => g.name)
                }), [])
                results = [...results, ...response.data.results]
                response = await axios.get(response.data.next)
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
})
// GET /videogame/:idVideoGame
router.get('/videogame/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params

    //me trae el detalle de la DB
    if (idVideogame.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        res.json(videogameDb)
    };

    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`);
        let { name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
        genres = genres.map(g => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
        platforms = platforms.map(p => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
        return res.json({
            name,
            background_image,
            genres,
            description,
            releaseDate,
            rating,
            platforms
        })
    } catch (err) {
        return console.log(err)
    }
})
// GET a /genres
router.get('/genres', async (req, res) => {
    // si ya los tengo cargados en la DB los utilizo desde alli
    const genresDb = await Genre.findAll();
    if (genresDb.length) return res.json(genresDb) 

    //else --> los voy a buscar a la API y los guardo en la DB
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
    const genres = response.data.results;
    genres.forEach(async g => {
        await Genre.findOrCreate({
            where: {
                name: g.name
            }
        })
    })
    res.json(genres)
})
//POST a /videogame
router.post('/videogame', async (req, res) => {
    let { name, description, releaseDate, rating, genres, platforms } = req.body;
    platforms = platforms.join(', ')
    try {
        const gameCreated = await Videogame.findOrCreate({
            where: {
                name,
                description,
                releaseDate,
                rating,
                platforms,
            }
        })
        await gameCreated[0].setGenres(genres); // relaciono la FK de genres al juego creado
    } catch (err) {
        console.log(err);
    }
    res.send('Created succesfully')
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;