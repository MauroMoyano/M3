const toJSON = (object) => {
   var keys = Object.keys(object);
   var JSONOut = '{';
   for (let i = 0; i < keys.length; i++) {
      if(i < keys.length - 1) {
         JSONOut = JSONOut + `"${keys[i]}":"${object[keys[i]]}",`;
      }else{
         JSONOut = JSONOut + `"${keys[i]}":"${object[keys[i]]}"`;
      }
   }
   JSONOut = JSONOut + '}';
   return JSONOut;
};

module.exports = toJSON;
