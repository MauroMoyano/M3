const http = require('http');
const url = require('url');
const db = require('./utils/data');
const express = require("express")
const axios = require("axios");
const bodyParser = require("body-parser")
const {response} = require("express");

const app = express()

app.listen(3001)

app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
app.use(bodyParser.json({limit: "50mb"}));

/*app.get("/1", (req, res) => {
    console.log("entro bien hasta el fondo marico")
})*/

//////////////////////////////////////////// Base de datos truchisima /////////////////////////////////////////////////
let fav = [];
//////////////////////////////////////////// controllers /////////////////////////////////////////////////
const idController = async (res, id) => {
    const character = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((response) => response.data)
        .then((data) => {
            return {
                id: data.id,
                name: data.name,
                species: data.species,
                gender: data.gender,
                image: data.image
            }
        })
    // console.log("character : " + character)
    res.status(200).json(character)
}

const detailIdController = (res, detailId) => {

    axios.get(`https://rickandmortyapi.com/api/character/${detailId}`)
        // .then((response) => response.data)
        .then((data) => {
            console.log("data de character  : " + data.data.name)
            const {id, status, name, species, gender, image, origin} = data.data
            res.status(200).json({
                id,
                status,
                name,
                species,
                gender,
                image,
                origin
            })
        })

}
//////////////////////////////////////////// routes /////////////////////////////////////////////////
app.get("/rickandmorty/character/:id", (req, res) => {
    // console.log("entro por la ruta id")
    const {id} = req.params;
    idController(res, id)
})

app.get("/rickandmorty/detail/:detailId", (req, res) => {

    const {detailId} = req.params;
    console.log("le pegue en el ojo : params " + detailId)
    detailIdController(res, detailId)
})

app.get("/rickandmorty/fav", (req, res) => {
    res.status(200).json(fav)
})

app.post("/rickandmorty/fav", (req, res) => {
    try {
        // console.log("arriba de la comprobacion" + JSON.stringify(req.body))
        if (req.body.gender) {
            fav.push(req.body)
            // console.log("aanajo de la comprobacion" + fav)
            res.status(201).end()
        }
    } catch (error) {
        res.status(400).json("mete un personaje puesss!" + error)
    }
})

app.delete("/rickandmorty/fav/:id", (req, res) => {
    const {id} = req.params;
    console.log("favo :" + fav.length)
    if (fav.length) {
        // console.log("favo :" + fav)
        const result = fav.filter((pj) => pj.id !== id)
        res.status(200).json(result)
    } else {
        res.status(400).json("No hay personajes en la base de datos.")
    }
})
// console.log(db);

/*const PORT = 3001;

http.createServer((req, res) => {
   const parsedUrl = url.parse(req.url, true);
   console.log(parsedUrl);
});*/
