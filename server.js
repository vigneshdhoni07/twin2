const exp=require("express")

const app=exp()

app.use(exp.json())

require('dotenv').config();

const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/aawi").then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})
require("./routes/authroutes")(app)
require("./routes/deviceroutes")(app)
require("./routes/roomroutes")(app)
require("./routes/applianceroutes")(app)

let port=process.env.PORT
app.listen(port,()=>{console.log(`app running at ${port}`)})