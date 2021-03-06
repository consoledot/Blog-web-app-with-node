const express = require("express")
const mongoose = require("mongoose")
const articleRouter = require("./routes/article")
const Article = require("./models/article")
const methodOveride = require("method-override")
const app = express()

mongoose.connect("mongodb://localhost:27017/blog",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
})
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(methodOveride("_method"))

app.get("/", async (req,res)=>{
    const articles = await Article.find().sort({createdAt: "desc"})
    res.render("articles/index", {articles:articles})
})

app.use("/articles", articleRouter)

app.listen(5000,()=>{
    console.log("Running on port 5000")
})  