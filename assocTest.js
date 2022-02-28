const res = require("express/lib/response");
const db = require("./models");

// db.project
//     .findOne({
//         where: { id: 1 },
//         include: [db.category],
//     })
//     .then((project) => {
//         // by using eager loading, the project model should have a categories key
//         console.log(project.categories, 'project categories');

//         // createCategory function should be available to this model - it will create the category then add it to the project
//         project.createCategory({ name: "express" }).then((category) => {
//             console.log(category.id, 'category id');
//         });
//     });

const assocFunction = async (projectStr, categoryStr) => {
    try {
        //    const allProjects = await db.project.findAll()
        const [project] = await db.project.findOrCreate({
            where: {
                name: projectStr,
            },
            include: [db.category],
            // include: [{
            //     model: db.categoriesProjects,
            //         include: [db.category]
            // }]
        });
        // console.log(allProjects);
        console.log("project1:", project);
        const [category] = await db.category.findOrCreate({
            where: {
                name: categoryStr
            }
        });
        console.log("category:", category);
        // await project.addCategory("node")
        // const newCategory = await db.category.create({ name: "sql" });
        // console.log(newCategory);
        await project.addCategory(category);
        console.log("project2:", project);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};

// find project
// give category association
assocFunction("Seattle Showdown", "sequelize");
