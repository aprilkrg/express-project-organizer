let express = require("express");
let db = require("../models");
let router = express.Router();

// GET "/categories" : index all categories
router.get("/", async (req, res) => {
    const allCats = await db.category.findAll({
        include: [db.project]
    });
    console.log(allCats);
    res.render("categories/categoryIndex", {allCats})
});

// GET "/categories/id" : show one category, and assoc projects
router.get("/:categoryId", async(req,res) => {
    const foundCat = await db.category.findOne({
        where: {
            id: req.params.categoryId
        },
        include: [db.project]
    });
    console.log(foundCat);
    res.render("categories/categoryShow", {foundCat})
});

module.exports = router;
