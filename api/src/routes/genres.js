require('dotenv').config();
const { APIKEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Genre } = require('../db');

// GET a /genres
router.get('/', async (req, res) => {
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

module.exports = router;