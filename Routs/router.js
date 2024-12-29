const express = require("express");
const lists = require("../Data/query");
const path = require("path");
const teachers = require("../Data/teacherInfo");

const router = express.Router();

// router.get('/',(req,res)=>{
//     res.render('home')
// })
// router.get('/api/data', (req, res) => {
//     res.json(data);  // Return data as JSON
// });

router.get("/", (req, res) => {
  const query = req.query.query;
  if (query) {
    const teacher = teachers.filter((item) => {
      return item.branch.toLowerCase() === query.toLowerCase();
    });
    res.render("home", { teacher });
    console.log(teacher);
  } else {
    res.render("home");
  }
});
router.get("/teacherInfo/:name", (req, res) => {
    const name=req.params.name;
    if (!name) {
        return res.status(400).send("<h1>Error: Name is required in the URL</h1>");
      }
        const teacherInt = teachers.find(
            (item) => item.name.toLowerCase() === name.toLowerCase()
        );
        if (teacherInt) {
            return res.render("../views/layouts/teacherinfo", { teacherInt });
        } else {
            return res.status(404).send(`user ${name} not found`);
        }

})
router.get("/subjectIntro", (req, res) => {
  const query = req.query.query;

  if (query) {
    const result = lists.filter((item) => {
      return item.branch.toLowerCase() === query.toLowerCase();
    });

    res.render("../views/layouts/subjectinfo", { result });
  } else {
    res.render("../views/layouts/subjectinfo", { result: [] });
  }
});
router.get("/details/:name", (req, res) => {
  const name = req.params.name;
  if (!name) {
    return res.status(400).send("<h1>Error: Name is required in the URL</h1>");
  }
  const user = lists.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (user) {
    return res.render("../views/layouts/details", { user });
  } else {
    return res.status(404).send(`user ${name} not found`);
  }
});

module.exports = router;
