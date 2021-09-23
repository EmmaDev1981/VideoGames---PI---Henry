const { Router } = require('express')
require('dotenv').config();
const { sequelize } = require('../db');
const { v4: newUuid } = require("uuid");
const { Videogame, Genres } = sequelize.models


const videogame = Router()

videogame.post('/', async function PostVideogame (req, res) {
    const { name, description, released, rating, platforms, genres, image } = req.body;
    const post = await Videogame.create({
        name,
        description,
        released: released || '0000-00-00',
        rating: rating || 0,
        platforms,
        image,
        genres,
        id: newUuid()
    })    
    let theGenres
    if(Array.isArray(genres)){
        theGenres = await Promise.all(genres.map(g => Genres.findByPk(g)))
    }
    else{
        theGenres = await Genres.findByPk(genres)
    }
    await post.setGenres(theGenres)
    return res.json(post.id)
})



module.exports = videogame;