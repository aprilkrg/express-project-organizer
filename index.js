// VARIABLES & PACKAGES
const express = require("express")
const db = require("./models")
const rowdy = require("rowdy-logger")

const app = express()
const PORT = process.env.PORT || 8000
rowdy.begin(app)

// MIDDLEWARE
app.set("view engine", "ejs")
app.use(require("morgan")("dev"))
// parse body from form requests
app.use(express.urlencoded({ extended: false }))


// CONTROLLERS
app.use("/projects", require("./controllers/projects"))
app.use("/categories", require("./controllers/categories"))

// ROUTES
app.get("/", async (req, res) => {
  try {
     const allProjects = await db.project.findAll()
     res.render("main/index", {projects: allProjects})
  } catch(err) {
    console.log("Error in GET /", err)
    res.status(400).render("main/404")
  }
})

app.get("*", (req, res) => {
  res.render("main/404")
})

// LISTENER
app.listen(PORT, () => {
  rowdy.print()
  console.log(`listening on port: ${PORT}`)
})
