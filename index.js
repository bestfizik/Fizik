const express=require("express")
require("dotenv").config()
const cors=require("cors")
const bodyParser=require("body-parser")
const AmallarRouter = require("./router/amallar.routes")
const UsersRouter =require("./router/users.routes")

const app=express()
app.use(cors())
app.use(bodyParser.json())
const PORT=process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Fizikdan salom")
})



//router
app.use(AmallarRouter)
app.use(UsersRouter)


app.listen(PORT,()=>{
    console.log("server is running at:"+PORT);
    
})