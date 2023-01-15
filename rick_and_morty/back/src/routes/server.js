const http = require("http")
const getCharByID = require("../controllers/getCharById")
const getCharDetail = require("../controllers/getCharDetail")



const PORT = 3000;

http.createServer((req, res) => {

    const id = req.url.split("/").at(-1)
    if (req.url.includes("onsearch")) {
        getCharByID(res, id)
    }
    if(req.url.includes("detail")){
        getCharDetail(res, id)
    }

}).listen(PORT, "localhost")


//////////////////////////////////////////////////////////////////////////////////////////////
/*
var http = require("http");
const fs = require("fs");
const characters = require("../utils/data.js")

const PORT = 3001


http.createServer((req, res) => {
    const {url} = req
    let respuesta;
    const id = url.split("/").at(-1);

    console.log(id)
    console.log(url)

    if (url.includes("/rickandmorty/characters")) {
        console.log("entro hasta el fondo")
        characters.forEach((elemento) => {
            console.log(elemento.id + " Ele id " + id)
            elemento.id.toString() === id ? respuesta = elemento : null;
        })
        console.log(respuesta + "respuesta")
        if (respuesta) {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify(respuesta))
            console.log(respuesta)
            return
        }
        res.writeHead(404,{"Content-Type" : "text/plain"})
        res.end("json not found")
    }
    res.end("terminamos la fn sin machear el character")
    return

}).listen(PORT, "localhost")*/
