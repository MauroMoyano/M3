"use strict";

let exerciseUtils = require("./utils");
const fs = require("fs");

let args = process.argv.slice(2).map(function (st) {
    return st.toUpperCase();
});

module.exports = {
    problemAx: problemA,
    problemBx: problemB,
    problemCx: problemC,
    problemDx: problemD
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
    let problem = module.exports["problem" + arg];
    if (problem) problem();
});

function problemA() {
    // callback version
    /* exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
         exerciseUtils.blue(stanza);
     });
     exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
         exerciseUtils.blue(stanza);
     });*/

    // promise version
    // Tu código acá:

    Promise.all([
        exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
            .then((response) => exerciseUtils.blue(response)),
        exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
            .then((response) => exerciseUtils.blue(response))])
        .then((values) => {
            exerciseUtils.blue(values)
            exerciseUtils.blue("done")
        }).catch(reason => exerciseUtils.magenta(reason))

}


function problemB() {
    let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return "poem-two/" + "stanza-0" + n + ".txt";
    });

    // callback version
    /*filenames.forEach((filename) => {
        exerciseUtils.readFile(filename, function (err, stanza) {
            exerciseUtils.blue(stanza);
        });
    });*/

    // promise version
    // Tu código acá:
    filenames.forEach((elemento) => {
        exerciseUtils.promisifiedReadFile(elemento)
            .then((res) => exerciseUtils.blue(res))
    })
}

function problemC() {
    let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return "poem-two/" + "stanza-0" + n + ".txt";
    });
    let randIdx = Math.floor(Math.random() * filenames.length);
    filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

    // callback version
    /*filenames.forEach((filename) => {
        exerciseUtils.readFile(filename, function (err, stanza) {
            exerciseUtils.blue(stanza);
            if (err) exerciseUtils.magenta(new Error(err));
        });
    });*/

    // promise version
    // Tu código acá:
    filenames.forEach((elemento) => {
        exerciseUtils.promisifiedReadFile(elemento)
            .then((res) => exerciseUtils.blue(res))
            .catch((reason) => exerciseUtils.magenta(new Error(reason)))
    })

}

function problemD() {
    let fs = require("fs");

    function promisifiedWriteFile(filename, str) {
        // tu código acá:
      return new Promise(function (resolve, reject) {
          fs.writeFile(filename, str, (err) => {
                if (err) reject("File not found");
                else resolve("resolvimos bien");
                console.log("Mauro")
            })
        },)

    }
    promisifiedWriteFile("poem-two/MauroMod", "Mira amigo este ejercicio ya anda!!")
        .then((res)=> console.log("lo logre!"), (err)=>{console.log(err)})
}
problemD()