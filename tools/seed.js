//seed from app data files
const bcrypt =require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;
const data = require("../data");

const teamListFile = require("./seedFiles/teamList");
const rostersFile = require("./seedFiles/rosters")
const scheduleFile = require("./seedFiles/basketballMasterScheduleTest")

async function seed() {
    
    console.log("seed")

    //create ref user
    let username = "frank";
    let password = "pass1";
    let userType = "ref"; 
    let userSport = ["basketball", "baseball"];

    await bcrypt.hash(password, BCRYPT_SALT_ROUNDS,  async(err, hashedPassword)=>{
        if(err) return;
        console.log('> bcrypt');
        const newUser = await data.users.create(username, hashedPassword, userType, userSport);
        // const updatedUser = await UsersData.updateTypeSport(newUser._id, userType, userSport);
        console.log('> routes/users/ user created');
        console.log(newUser)
        // return (null, newUser);//newUser;//done
    });
    console.log("*****")

    //create admin user
    const username2 = "akshay";
    const password2 = "good2";
    const userType2 = "admin"; 
    const userSport2 = ["basketball"];

    await bcrypt.hash(password2, BCRYPT_SALT_ROUNDS,  async(err, hashedPassword2)=>{
        if(err) return;
        console.log('> bcrypt');
        const newUser = await data.users.create(username2, hashedPassword2, userType2, userSport2);
        // const updatedUser = await UsersData.updateTypeSport(newUser._id, userType, userSport);
        console.log('> routes/users/ user created');
        console.log(newUser)
        // done (null, newUser);//newUser;//done
    });

    

    // Populate TeamList Collection
    const teamIdTable = [];

    for(let i =0; i<teamListFile.length; i++){
        let subList = teamListFile[i];
        console.log("*******************************************************************************");
        // console.log(subList)
        for(let j=0; j<subList.teams.length; j++){
            console.log(subList.teams[j])
            const newTeam = await data.teamList.create(subList.teams[j].name, subList.teams[j].league, "basketball", "2018-2019");
            // const set = {name:newTeam.teamName, id:newTeam._id}
            if(newTeam!=undefined) teamIdTable.push({name:newTeam.teamName, id:newTeam._id}) //this workaround was necessary bc calling the mongoDb.teamList collection to get the teamId was overloading the mongoDb and causing it to crash. 
        }
    }
    // console.log(teamIdTable)

    // Populate Rosters SubDoc into TeamList

    for(let i =0; i<rostersFile.length; i++){
        // console.log(rostersFile[i])
        for(let j=0; j<rostersFile[i].roster.length; j++){
            // console.log(rostersFile[i].team, rostersFile[i].league, rostersFile[i].roster[j])
            let targetTeam = await teamIdTable.find(function(entry){return entry.name== rostersFile[i].team});
            // console.log(targetTeam.id, targetTeam.name, rostersFile[i].team)
            const updatedTeam = await data.teamList.createPlayer(targetTeam.id.toString(), rostersFile[i].roster[j].name);
            console.log(updatedTeam);
            console.log("*******************************************************************************");
        }
    }

    //Populate Events Collection
    console.log(scheduleFile.length);
    for(let i =0; i<scheduleFile.length; i++){
        console.log(scheduleFile[i].date);
        console.log(scheduleFile[i].events.length);
        for(let j=0; j<scheduleFile[i].events.length; j++){
            console.log(scheduleFile[i].events[j])
            let team1Obj = await teamIdTable.find(function(entry){return entry.name== scheduleFile[i].events[j].team1});
            let team2Obj = await teamIdTable.find(function(entry){return entry.name== scheduleFile[i].events[j].team2});
            console.log(team1Obj, team2Obj);

            const newEvent = await data.events.create(team1Obj.id.toString(), team2Obj.id.toString(), scheduleFile[i].date, scheduleFile[i].events[j].time, scheduleFile[i].events[j].location, scheduleFile[i].events[j].type);
            console.log(newEvent)
            // console.log("*******************************************************************************");
        }
    }

    
    // await data.teamList.test();
    
    // const team = await data.teamList.read("5cd1b56f022d643dcd201ba3");
    // console.log(team)
    // const teamB = await data.teamList.read("5cd1fa8e4c1a814617556f88");
    // const teamB = await data.teamList.create("Hoboken Middle School Knicks 2", "grammar", "basketball", "2018-2019");

    // console.log(await data.teamList.read(str));
    // try{
    //     //ADDING PLAYERS TO PLAYERLIST 
    //     // await data.teamList.createPlayer(team._id.toString(), "john williams");
    //     // const teamARoster = await data.teamList.createPlayer(team._id.toString(), "Mikie Day");
    //     // console.log(teamARoster);

    //     //ADDING EVENTS:
    //     data.events.create(team._id.toString(), teamB._id.toString(), "2019-03-23", "7:00PM", "Hoboken High School Gym", "game")

    // }
    // catch(e){
    //     console.log(e);
    // }


    console.log("DONE")
}

seed();

