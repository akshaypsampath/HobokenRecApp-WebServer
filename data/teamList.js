const mongoCollections = require("../config/db/mongoCollections");
const teamList = mongoCollections.TeamList;
const { ObjectId } = require('mongodb');
const rostersData = require("./rosters");

module.exports = {
    test: async()=>{
        const teamListCollection = await teamList();
        const tempTeam = await teamListCollection.find({ season: "2018-2019" }).toArray();
        console.log(tempTeam)
    },
    create: async (teamName, league, sport, season) =>{
        if(!teamName){
            throw "Must provide a team name";
        }
        if(!league){
            throw "Must provide a league";
        }
        if(!sport){
          throw "Must provide a sport";
        }
        if(!season){
          throw "Must provide a season";
        }
        if (typeof teamName != 'string') throw "Must provide a teamName of type string";
        if (typeof league != 'string') throw "Must provide a league of type string";
        if (typeof sport != 'string') throw "Must provide a sport of type string";
        if (typeof season != 'string') throw "Must provide a season of type string";

        //let leagueId = new ObjectId(league);

        const teamListCollection = await teamList();

        let newTeam = {
            
            teamName: teamName,
            league: league,
            sport: sport,
            season: season,  
            playerList: []
        };

        const prevEntry = await teamListCollection.find({teamName: teamName, league:league, sport: sport, season: season}).toArray();
        // console.log("prevEntry: ",prevEntry.length);
        if(prevEntry.length >0){ //avoid duplicate entries
            // console.log(await teamListCollection.find({teamName: teamName, sport: sport, season: season}).toArray().size());
            console.log("team already exists in this collection")
            return;
        }
        const insertData = await teamListCollection.insertOne(newTeam);
        if (insertData.count === 0) throw "Could not add team";
    
        const newId = insertData.insertedId;
        let idStr = newId.toString();
        //console.log(newId, idStr);
    
        const team = await module.exports.read(idStr);
        return team;
    },
    async read(id) {
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";
        //console.log(id)
        const idObj = new ObjectId(id)

        const teamListCollection = await teamList();
        const tempTeam = await teamListCollection.findOne({ _id: idObj });
        console.log(tempTeam)
        
        // if (tempTeam === null) throw "No team with that Id";
        //console.log(tempAnimal);
        return tempTeam;
    },
    async readByName(name) {
        if (!name) throw "Must provide a valid name";
        if (typeof name != 'string') throw "Must provide a name of string type";
        //console.log(id)
        // const idObj = new ObjectId(id)

        const teamListCollection = await teamList();
        const tempTeam = await teamListCollection.findOne({ teamName: name });
        console.log(tempTeam)
        
        // if (tempTeam === null) throw "No team with that Id";
        //console.log(tempAnimal);
        return tempTeam;
    },
    readAll: async() => {
        // if (!id) throw "Must provide a valid Id";
        // if (typeof id != 'string') throw "Must provide an Id of string type";
        //console.log(id)
        //const idObj = new ObjectId(id)

        const teamListCollection = await teamList();


        const tempTeam = await teamListCollection.find({}).toArray();
        //console.log(animalData)

        // for(let i=0; i<tempPost.length; i++){
        //     //console.log( tempPost[i].author.toString());
        //     const obj = await animalData.get(tempPost[i].author.toString());
        //     tempPost[i].author = {_id: obj._id, name: obj.name};
        // }
        if (tempTeam === null) throw "No teams found";
        //console.log(tempAnimal);
        return tempTeam;
    },
    updateName: async(id, teamName) => { //needs to be updated
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        if (!teamName) throw "Must provide a valid Team Name";
        if (typeof teamName != 'string') throw "Must provide a Team Name of string type";

        const idObj = new ObjectId(id)

        const teamListCollection = await teamList();
        const tempTeam = await teamListCollection.findOne({ _id: idObj });
        console.log(tempTeam)
        if (tempTeam === null) throw "No Team with that Id";

        const updatedData = await teamListCollection.updateOne({ _id: idObj }, {$set: {teamName:teamName}});

        if (updatedData.modifiedCount === 0) {
            throw "could not update Team successfully";
        }
        const modObj = await module.exports.read(id);
        console.log(modObj)

        rostersData.updateName(id, teamName); //updates teamName in Rosters as well

        return modObj;
    },
    createPlayer: async(id, playerName) =>{
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        if (!playerName) throw "Must provide a valid Player Name";
        if (typeof playerName != 'string') throw "Must provide a Player Name of string type";

        const teamListCollection = await teamList();
        const teamIdObj = new ObjectId(id);
        const playerIdObj = new ObjectId();

        let newPlayer = {
            playerId: playerIdObj,
            playerName: playerName
        };

        // tempTeam.playerList.push(newPlayer);
        const updatedData = await teamListCollection.updateOne({_id:teamIdObj}, {$push:{playerList: newPlayer}})

        if (updatedData.modifiedCount === 0) {
            throw "could not update Team successfully";
        }

        const modObj = await module.exports.read(id);
        console.log(modObj);
        return modObj;
    },
    deletePlayer: async(id, playerId) =>{
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        if (!playerId) throw "Must provide a valid Player Id";
        if (typeof playerId != 'string') throw "Must provide a Player Id of string type";

        const tempTeam = await module.exports.read(id);
        
        const deletedObj = _.remove(tempTeam.playerList, function(player){return player.playerId == playerId});
        if(!deleteObj) { throw "Player not found in this Roster"}

        const modObj = await module.exports.read(id);
        console.log(modObj);
        return modObj;
    },    
    delete: async(id) => { ////needs to be updated
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        const idObj = new ObjectId(id)

        const teamListCollection = await teamList();
        const deletionInfo = await teamListCollection.removeOne({ _id: idObj });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete post with id of ${id}`;
        }
    }
}