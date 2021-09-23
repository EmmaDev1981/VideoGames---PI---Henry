require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default
const { API_KEY } = process.env;
const { sequelize, Op } = require('../db')
const { Videogame, Genres } = sequelize.models
const { v4: newUuid } = require("uuid");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogames = require('./videogames.js');
const genres = require('./genres.js')
const videogame = require ('./videogame.js')

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogames);
router.use('/genres', genres)
router.use('/videogame', videogame)


module.exports = router;
