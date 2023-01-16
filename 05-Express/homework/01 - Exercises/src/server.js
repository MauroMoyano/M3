// const bodyParser = require("body-parser");
const express = require("express");
const {stringify} = require("nodemon/lib/utils");

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let publications = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

//////////////////////////////// CONTROLADORES ///////////////////////////////////
const createPost = (author, title, contents) => {
/*
    if (!author) return res.status(400).end(JSON.stringify({error: "No se recibieron los parámetros necesarios para crear la publicación"}))
    if (!title) return res.status(400).end(JSON.stringify({error: "No se recibieron los parámetros necesarios para crear la publicación"}))
    if (!contents) return res.status(400).end(JSON.stringify({error: "No se recibieron los parámetros necesarios para crear la publicación"}))
*/
    const publicacion = {
        id: publications.length + 1,
        author: author,
        title: title,
        contents: contents
    }
    publications.push(publicacion);
}

/////////////////////////////////// ROUTES //////////////////////////////////////
server.post("/posts", (req, res) => {
    const {author, title, contents} = req.body
    if(!author || !title || !contents) return res.status(400).end(JSON.stringify({error: "No se " +
            "recibieron los parámetros necesarios para crear la publicación"}))

    const newPost = createPost(author, title, contents)
    console.log(newPost)
    res.status(200).json(newPost)
})

server.get("/posts", (req, res)=>{

})


/*if(req.query.term){
        const termsWords = publications.filter((elemento)=>{
            elemento.title.includes("term")
        })
        res.end(JSON.stringify(termsWords))
    } else {
        res.end(JSON,stringify(publications))
    }*/

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = {publications, server};


/// prueba de commit