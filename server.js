const express = require("express")
const articleRouter = require("./routes/article")
const app = express()

app.set("view engine", "ejs")

app.use("/articles",articleRouter)

app.get("/",(req,res)=>{
    const articles =[{
        title:"Gbas Gboas",
        createdAt: new Date(),
        description:"the only guy that knows nothing"
    },
    {
        title:"Second is false",
        createdAt: new Date(),
        description:"levevu, nah why i no sabi French"
    }]
    res.render("articles/index", {articles:articles})
})
app.listen(5000,()=>{
    console.log("Running on port 5000")
})