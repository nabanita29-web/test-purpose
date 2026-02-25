const { Client } = require("pg")
const con = new Client({
    host:"ballast.proxy.rlwy.net",
    user:"postgres",
    port: 29340,
    password:"kuvIfzohZdEVsmBStALbqgEnrXncXgTJ",
    database: "todocrud"
})
module.exports = con