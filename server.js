let express=require("express");
const conectDB = require("./config/conectDB");
let user=require("./routes/User")
let app=express();
app.use(express.json())
app.use("/user",user)
conectDB()
let PORT=process.env.PORT||5000;
app.listen(PORT,err=>err?console.log(err):console.log(`server is runing on port ${PORT}`))