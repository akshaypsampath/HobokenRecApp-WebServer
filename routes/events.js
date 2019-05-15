const express = require("express");
const router = express.Router();
const data = require("../data");
const eventsData = data.events;
const teamListData = data.teamList;


router.get("/", async (req, res) => {
  //ERR CHECK
  console.log("Events: GETTING!");
  try{
    if (req.isAuthenticated()) {
        // if(!req.params.id) throw "No Id Found!"
      const events = await eventsData.readAll();//get(req.params.id.toString());

      events.forEach(async(element) => {
        let team1 = await teamListData.read(element._idteam1.toString());
        let team2 = await teamListData.read(element._idteam2.toString());
        element.team1 = team1.teamName;
        element.team2 = team2.teamName;
        element.league = team1.league;
        element.sport = team1.sport;
        element.season = team1.season;
      });
      // console.log(events);
      res.render("eventList", { eventList: events, user: res.locals.user });
    } else {
      const json = {
          "validation": false,
          "message": "Please login to your account"
      }
      res.send(json);
    }
    
  
    // res.json("events");
  } catch (e) {
    console.log("threw it out")
    res.status(404).json({ error: "User not found" });
  }
});
router.get("/:id", async (req, res) => {
  try{
    if (req.isAuthenticated()) {
      const event = await eventsData.read(req.params.id);
      console.log(event)
      console.log(res.locals.user)
      res.render("eventView", {event:event, user: res.locals.user});
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

router.post("/:id", async (req, res) => {

  try{
    if (req.isAuthenticated()) {
      console.log(req.body)
      const event = await eventsData.read(req.params.id);
      console.log(event)
      res.render("eventView", {event:event, user: res.locals.user});
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

router.post("/updateScore/:id", async (req, res) => {//post("/updateScore
  console.log("Events: /updateScore/:id!");
  try{
    if (req.isAuthenticated()) {
      if(xss(req.body.team1score) && xss(req.body.team1score)){
        // console.log(req.body)
        console.log(req.params.id, req.body.team1score, req.body.team2score)
        const event = await eventsData.updateScore(req.params.id, req.body.team1score, req.body.team2score);
        console.log(event)
        res.render("eventView", {event:event, user: res.locals.user});
        // res.json({message:"hi"});
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