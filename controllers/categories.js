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

module.exports = router