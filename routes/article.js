const express = require("express")
const Article = require("../models/article")
const router = express.Router()

router.get("/", (req, res) => {
    res.send('welcome')
})

router.get("/new",(req,res)=>{
    res.render("articles/new", {article:{}})
})
router.get("/:id", async (req,res)=>{
    try{
        const article = await Article.findById(req.params.id)
        res.render("articles/show",{article:article})
    }
    catch(e){
        res.redirect("/")
    }
   
    // if(article == null) 
   
})

router.post("/", async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{ 
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e)
        res.render("articles/new", {article:article})
    }

})

module.exports = router 