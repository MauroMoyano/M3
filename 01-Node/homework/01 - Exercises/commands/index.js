const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
    print(process.cwd())
}

function date(print) {
    print(Date())
}

function echo(print, args) {
    print(args)
}

function ls(print) {
    fs.readdir(".", (error,files)=>{
        if(error) throw error;
        print(files.toString().replaceAll(","," "))
    })
}

function cat(print, args) {
    fs.readFile(args,"utf-8",(err,data)=>{
        if(err) throw err;
        print(data)
    })
}

function head(print, args) {
    fs.readFile(args, "utf-8", (err, data)=>{
        if(err) throw err
       const text = data.split("\n")[0]
        print(text)
    })
}

function tail(print, args) {
    fs.readFile(args, "utf-8", (err, data)=>{
        if(err) throw err;
         print((data.split("\n").at(-1)).trim())
    })
}
function curl(print, args) {
    utils.request("http://" + args , (err,  response)=>{
        if(err) throw err;
        // console.log(response)
         print(response)
    })
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};
