let express = require("express")
let db = require("../models")
let router = express.Router()

// http POST url /projects - creates a new project
router.post("/", async (req, res) => {
  try{
    const newProject = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })
    const [category] = await db.category.findOrCreate({
      where: {
        name: req.body.category
      }
    })
    await newProject.addCategory(category)
    res.redirect("/")
  } catch(err) {
    console.log("ERROR", err)
    res.status(400).render("main/404")
  }
})

// http GET url /projects/new - view form for creating a new project
router.get("/new", (req, res) => {
  res.render("projects/new")
})

// http GET url /projects/:id - show one project
router.get("/:id", async (req, res) => {
  try {
    const oneProject = await db.project.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!oneProject) throw Error()
    res.render("projects/show", {project: oneProject})
  } catch(err) {
    res.status(400).render("main/404")
  }
})

module.exports = router
