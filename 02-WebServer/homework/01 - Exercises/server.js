var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;

/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
    /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
    http.createServer((req, res) => {
        console.log(`Server raised in port ${PORT}`);
        if (req.url === "/api") {
            fs.readFile("./utils/dogsData.json", (err, data) => {
                if (err) {
                    res.writeHead(404, {"Content-Type" : "text/plain"})
                    res.end("json not found")
                }
                res.writeHead(200,{"Content-Type" : "application/json"})
                res.end(data)
            })
            return
        }
        if(req.url === "/allDogs"){
            fs.readFile("utils/allDogs.html", "utf-8", (err, data)=>{
                if(err){
                    res.writeHead(404, {"Content-Type" : "text/plain"})
                    res.end("html not found")
                }
                res.writeHead(200,{"Content-Type" : "text/html"})
                res.end(data)
            })
            return
        }
        res.writeHead(404, {"Content-Type" : "text/plain"})
        res.end("Route not found")
    }).listen(PORT, "localhost")
;
