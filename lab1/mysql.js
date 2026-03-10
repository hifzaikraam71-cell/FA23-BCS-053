const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",       // XAMPP default blank password
    database: "testdb"
});

connection.connect((err)=>{
    if(err){
        console.log("MySQL Error:", err);
    }else{
        console.log("MySQL Connected");
    }
});

module.exports = connection;