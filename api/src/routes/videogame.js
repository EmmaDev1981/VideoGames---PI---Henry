require('dotenv').config();
const { APIKEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

// GET /videogame/:idVideoGame
// consulto el detalle del juego por el ID
router.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params
    
    //verifico si es un juego creado y me trae el detalle de la DB
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
        let { id, name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
        genres = genres.map(g => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
        platforms = platforms.map(p => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
        return res.json({
            id,
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

//POST a /videogame
router.post('/', async (req, res) => {
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
    res.send('Created succesfully, saludos desde el BACK!!')
})

module.exports = router;