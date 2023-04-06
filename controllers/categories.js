const express = require("express")
const router = express.Router()
const db = require("../models")

// http GET url /categories - index of categories 
router.get("/", async (req, res) => {
    try {
        const allCategories = await db.category.findAll({
            // eager loading
            include: [db.project]
        })
        res.render("categories/index.ejs", {
            categories: allCategories
        })
    } catch(err) {
        res.status(400).render("main/404")
    }
})

// http GET url /categories/:id - show one category
router.get("/:id", async (req, res) => {
    try {
        const oneCategory = await db.category.findOne({
            where: {
                id: req.params.id
            }, 
            include: [db.project]
        })
        res.render("categories/show.ejs", {
            category: oneCategory
        })
    } catch(err) {
        res.status(400).render("main/404")
    }
})

module.exports = router