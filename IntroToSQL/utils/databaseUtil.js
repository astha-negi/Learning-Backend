const mysql= require("mysql2");

const pool= mysql.createPool({
    host: "localhost",
    user: "root",
    database: "airbnb",
    password: "#0707"
});

module.exports= pool.promise();