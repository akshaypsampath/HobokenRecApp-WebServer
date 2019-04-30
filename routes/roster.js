const express = require("express");
const router = express.Router();
const data = require("../data");
//const rosterData = data.roster;


router.get("/", async (req, res) => {
  //ERR CHECK
  console.log("Details: GETTING!");
  try{
    // if(!req.params.id) throw "No Id Found!"
    // const user = await detailsData.get(req.params.id.toString());
    // console.log(user);
    // res.render("details", { user: user });
  
    res.json("roster");
  } catch (e) {
    console.log("threw it out")
    res.status(404).json({ error: "User not found" });
  }
});



module.exports = router;