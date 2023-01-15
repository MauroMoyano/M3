const toJSON = require("../utils/toJSON")
const axios = require("axios");

const getCharById = (res, id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then((data) => data.data)
        .then((data) => {
            const char = {
                image: data.image,
                name: data.name,
                gender: data.gender,
                species: data.species,
                id: data.id
            }
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(toJSON(char))
        })
        .catch((err) => {
                res.writeHead(500, {"Content-Type": "text/plain"})
                res.end(err.message + "Mauro no sabe donde esta el problema")
            }
        )

}


module.exports = getCharById;