const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db",(err)=>{
if(err){
console.log("SQLite Error:",err);
}else{
console.log("SQLite Connected");
}
});

module.exports = db;