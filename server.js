const express = require("express")
const dotenv = require("dotenv")
const bp = require("body-parser")
const cp = require("cookie-parser")
const authRoute = require("./routes/authRoute")
require("./db/conn")

const app = express()

dotenv.config()

app.use(bp.urlencoded({extended:false}))
app.use(bp.json())
app.use(cp())
app.use(authRoute)


PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`PORT SUCCESSFULLY CONNNECTED TO ${PORT}`);
})

module.exports = app