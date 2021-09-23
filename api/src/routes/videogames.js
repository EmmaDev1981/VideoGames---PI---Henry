const { Router } = require('express');
const axios = require('axios').default
require('dotenv').config();
const { API_KEY } = process.env;
const { sequelize, Op } = require('../db');
const { Videogame, Genres } = sequelize.models

const videogames = Router();

videogames.get('/', async function (req, res) {
    if(req.query.name){
        Promise.all([axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${req.query.name}`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${req.query.name}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${req.query.name}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${req.query.name}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${req.query.name}&page=5`)])
        .then((result) => {
            let response = []
            for(let i = 0; i < result.length; i++){
                response = response.concat(result[i].data.results)
            }
        var GamesAPI = response.map(game => { 
        return {
            name: game.name,
            genres: game.genres,
            image: game.background_image,
            rating: game.rating,
            id: game.id
        }})
        return GamesAPI
        })
        .then(async function (response) {
            const DBGames = await Videogame.findAll({
                where: { name: {[Op.iLike]: req.query.name + '%' }},
                attributes: { exclude: ['createdAt' , 'updatedAt']},
                include: {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }    
                }
            })
            return res.send([...DBGames, ...response])
        }) 
        .catch(() =>{
            return res.status(404).send('The game you are looking for does not exist or is not registered in our database')
        })
        }
    if(!req.query.name){
        Promise.all([axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)])
        .then((result) => {
            let response = []
            for(let i = 0; i < result.length; i++){
                response = response.concat(result[i].data.results)
            }
            var APIGames = response.map(game => { 
                return {
                    name: game.name,
                    genres: game.genres,
                    image: game.background_image,
                    rating: game.rating,
                    id: game.id
                }})
            return APIGames
        })
        .then(async function (response) {
            const DBGames = await Videogame.findAll({
                attributes: { exclude: ['createdAt' , 'updatedAt']},
                include: {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }    
                }
            })
            return res.send([...DBGames, ...response])
        }) 
        .catch((err) => {
            return res.send(err)
    })}
})

videogames.get('/:id', async (req, res) => {
    if(req.params.id){
        //Compara con la DB
        const DBGame = await Videogame.findByPk(req.params.id,
            {
            attributes: { exclude: ['createdAt' , 'updatedAt']},
            include: {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                        }    
            }
            })
            .catch(() => console.log('It isn´t on the DB'))
            if(DBGame) return res.send(DBGame)

        //Compara con la API
        axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${API_KEY}`)
        .then((response) => {
            var game = response.data
            if(game) {
                var GameDetail = { 
                    name: game.name,
                    genres: game.genres,
                    image: game.background_image,
                    description: game.description_raw,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                    id: game.id
                }  
                return res.send(GameDetail)
            }
        })
        .catch(() => res.send('Videogame not found'))
    }
})


module.exports = videogames;