const express = require("express")
const Article = require("../models/article")
const router = express.Router()

// router.get("/", (req, res) => {
//     res.send('welcome')
// })

router.get("/new",(req,res)=>{
    res.render("articles/new", {article:{}})
})
router.get("/:slug", async (req,res)=>{
    try{
        const article = await Article.findOne({slug:req.params.slug})
        res.render("articles/show",{article:article})
    }
    catch(e){
        res.redirect("/")
    }
})

router.post("/", async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{ 
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    }catch(e){
        console.log(e)
        res.render("articles/new", {article:article})
    }

})
router.delete("/:id", async (req,res)=>{
    await Article.findOneAndDelete(req.params.id)
    res.redirect("/")
})

module.exports = router 