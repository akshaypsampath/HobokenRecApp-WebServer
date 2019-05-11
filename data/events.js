const mongoCollections = require("../config/db/mongoCollections");
const events = mongoCollections.Events;
const teamListData = require("./teamList");
const { ObjectId } = require('mongodb');

module.exports = {
    create: async (team1id, team2id, date, time, location, type) =>{
        if(!team1id){
            throw "Must provide a team 1 Id";
        }
        if(!team2id){
            throw "Must provide a team 2 Id";
        }
        if(!date){
            throw "Must provide a date";
        }
        if(!time){
          throw "Must provide a time";
        }
        if(!location){
          throw "Must provide a location";
        }
        if(!type){
            throw "Must provide a game type";
        }
        if (typeof team1id != 'string') throw "Must provide a team 1 Id of type string";
        if (typeof team2id != 'string') throw "Must provide a team 2 Id of type string";

        if (typeof date != 'string') throw "Must provide a date of type string";
        const dateObj = new Date(date);
        console.log(dateObj)
        if(dateObj.toString() == "Invalid Date") throw "Must provide a valid Date";

        if (typeof time != 'string') throw "Must provide a time of type string";
        if (typeof location != 'string') throw "Must provide a location of type string";
        if (typeof type != 'string') throw "Must provide a game type of type string";

        const team1 = teamListData.read(team1id)
        const team2 = teamListData.read(team2id)

        if(!team1) {throw "Could not create game because team 1 was not found"}
        if(!team2) {throw "Could not create game because team 2 was not found"}

        if(team1.league != team2.league) {throw "Could not create game because both teams must be in the same league"}
        if( team1.sport != team2.sport ) {throw "Could not create game because both teams must be in the same sport"}
        if(team1.season != team2.season) {throw "Could not create game because both teams must be in the same season"}

        let newEvent = {
            
            _idteam1:  team1id,
            _idteam2:  team2id,
            date: dateObj,
            time: time,
            location: location,
            type: type,
            team1score: null,
            team2score: null
        };

        const eventsCollection = await events();

        const prevEntry = await eventsCollection.find({_idteam1:team1id, _idteam2:team2id, date: dateObj, time:time, location: location, type: type}).toArray();
        console.log("prevEntry: ",prevEntry);
        if(prevEntry.length >0){ //avoid duplicate entries
            // console.log(await teamListCollection.find({teamName: teamName, sport: sport, season: season}).toArray().size());
            console.log("team already exists in this collection")
            return;
        }

        const insertData = await eventsCollection.insertOne(newEvent);
        if (insertData.count === 0) throw "Could not add team";
    
        const newId = insertData.insertedId;
        let idStr = newId.toString();
        //console.log(newId, idStr);
    
        const event = await module.exports.read(idStr);
        return event;
    },
    read: async(id) => {
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";
        //console.log(id)
        const idObj = new ObjectId(id)

        const eventsCollection = await events();
        const tempEvent = await eventsCollection.findOne({ _id: idObj });

        
        // if (tempEvent === null) throw "No Event with that Id";
        //console.log(tempAnimal);
        return tempEvent;
    },
    readOnDate: async(date) => {
        if (!date) throw "Must provide a valid date";
        if (typeof date != 'string') throw "Must provide an date of string type";
        //console.log(id)
        const dateObj = new Date(date)

        const eventsCollection = await events();
        const tempEvents = await eventsCollection.find({ date: dateObj }).toArray;

        
        // if (tempEvents === null) throw "No events on that date";
        //console.log(tempAnimal);
        return tempEvents;
    },
    readAll: async() => {
        // if (!id) throw "Must provide a valid Id";
        // if (typeof id != 'string') throw "Must provide an Id of string type";
        //console.log(id)
        //const idObj = new ObjectId(id)

        const eventsCollection = await events();


        const tempEvent = await eventsCollection.find({}).toArray();
        //console.log(animalData)

        // for(let i=0; i<tempPost.length; i++){
        //     //console.log( tempPost[i].author.toString());
        //     const obj = await animalData.get(tempPost[i].author.toString());
        //     tempPost[i].author = {_id: obj._id, name: obj.name};
        // }
        if (tempEvent === null) throw "No Events found";
        //console.log(tempAnimal);
        return tempEvent;
    },
    delete: async(id) => { ////needs to be updated
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        const idObj = new ObjectId(id)

        const eventsCollection = await events();
        const deletionInfo = await eventsCollection.removeOne({ _id: idObj });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete post with id of ${id}`;
        }
    }
}