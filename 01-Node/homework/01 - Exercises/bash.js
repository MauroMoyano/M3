const process = require("process");
const commands = require("./commands/index.js");

function bash() {
  process.stdout.write("prompt > ")
  process.stdin.on( "data" , (data)=>{
    const inputs = data.toString().trim().split(" ")
    const cmd = inputs.shift()
    const args = inputs.join(" ")

   /* console.log("cmd ->"+cmd)
    console.log("args ->"+args)*/


    //commands[cmd]?
    if(commands.hasOwnProperty(cmd)){
      commands[cmd](print, args);
    }else{
      print("command not found: " + cmd);
    }
    //console.log(cmd)
  })
}
const print = (output)=>{

  process.stdout.write(output)
  process.stdout.write("\nprompt > ")
}


bash();
module.exports = {
  print,
  bash,
};
