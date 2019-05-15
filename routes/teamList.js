const express = require("express");
const router = express.Router();
const data = require("../data");
const teamListData = data.teamList;
const xss = require("xss");

router.get("/", async (req, res) => {
  //ERR CHECK
  console.log("Details: GETTING!");
  // console.log(req.params)
  try{
    if (req.isAuthenticated()) {
      const teamList = await teamListData.readAll();
      // console.log(teamList)
    
      res.render("teamList", {teamList:teamList, user: res.locals.user});//json("teamList");
    } else {
      const json = {
          "validation": false,
          "message": "Please login to your account"
      }
      res.send(json);
    }
      // if(!req.params.id) throw "No Id Found!"
      // const user = await detailsData.get(req.params.id.toString());
      // console.log(user);
      // res.render("details", { user: user });
      // const teamList = await teamListData.readAll();
      // // console.log(teamList)
    
      // res.render("teamList", {teamList:teamList});//json("teamList");
  } catch (e) {
    console.log("threw it out")
    res.status(404).json({ error: "User not found" });
  }
});

router.get("/:id", async (req, res) => {
  try{
    if (req.isAuthenticated()) {
      const team = await teamListData.read(req.params.id);
      console.log(team)
      res.render("teamView", {team:team, user: res.locals.user});
      // res.json({message:"hi"});

    } else {
      const json = {
          "validation": false,
          "message": "Please login to your account"
      }
      res.send(json);
    }
    
} catch (e) {
  console.log("threw it out")
  res.status(404).json({ error: "User not found" });
}
});
router.post("/updateName/:id", async (req, res) => {//post("/updateScore
  console.log("TeamList: /updateName/:id!");
  try{
    if (req.isAuthenticated()) {
      if(xss(req.body.name) ) {
        // console.log(req.body)
        console.log(req.params.id, req.body.name)
        const team = await teamListData.updateName(req.params.id, req.body.name);
        console.log(team)
        res.render("teamView", {team:team, user: res.locals.user});
      }
    } else {
      const json = {
          "validation": false,
          "message": "Please login to your account"
      }
      res.send(json);
    }
    
} catch (e) {
  console.log(e)
  res.status(404).json({ error: e });
}
});

module.exports = router;