const mongoCollections = require("../config/db/mongoCollections");
const teamList = mongoCollections.teamList;
//const animalData = require("../data/animals");
//const animalData = data.animals;
const { ObjectId } = require('mongodb');

module.exports = {
    create: async (teamName, league, content) =>{
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
            season: season  
        };

        const insertData = await teamListCollection.insertOne(newTeam);
        if (insertData.count === 0) throw "Could not add team";
    
        const newId = insertData.insertedId;
        let idStr = newId.toString();
        //console.log(newId, idStr);
    
        const team = await module.exports.read(idStr);
        return team;
    },
    read: async(id) => {
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";
        //console.log(id)
        const idObj = new ObjectId(id)

        const teamListCollection = await teamList();
        const tempTeam = await teamListCollection.findOne({ _id: idObj });

        
        if (tempTeam === null) throw "No team with that Id";
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
    update: async(id, newTitle, newContent) => { //needs to be updated
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        console.log(newTitle);
        console.log(newContent);

        const idObj = new ObjectId(id)

        const postCollection = await posts();
        const tempPost = await postCollection.findOne({ _id: idObj });
        console.log(tempPost)
        if (tempPost === null) throw "No animal with that Id";

        if(newContent!=undefined && newTitle != undefined){
            const updatedData = await postCollection.updateOne({ _id: idObj }, {$set: {teamName:newTitle, content:newContent}});

            if (updatedData.modifiedCount === 0) {
                throw "could not update animal successfully";
            }
            const modObj = await module.exports.read(id);
            console.log(modObj)
            return modObj;
        }

        if (newContent==undefined) //throw "Must provide a valid teamName";
        {
            const updatedData = await animalCollection.updateOne({ _id: idObj }, {$set: {content:newContent}});
            
            if (updatedData.modifiedCount === 0) {
                console.log(updatedData.modifiedCount);
                throw "could not update animal successfully";
            }
            return await module.exports.read(id);

        }
        if (newTitle==undefined) //throw "Must provide a valid teamName";
        {
            const updatedData = await animalCollection.updateOne({ _id: idObj }, {$set: {content:newContent}});
            
            if (updatedData.modifiedCount === 0) {
                throw "could not update animal successfully";
            }
            return await module.exports.read(id);
        }
        //if (typeof teamName != 'string') throw "Must provide a teamName of string type";

        // if (!content) throw "Must provide valid content";
        // if (typeof content != 'string') throw "Must provide content of string type";


    },
    delete: async(id) => { ////needs to be updated
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string') throw "Must provide an Id of string type";

        const idObj = new ObjectId(id)

        const postCollection = await posts();
        const deletionInfo = await postCollection.removeOne({ _id: idObj });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete post with id of ${id}`;
        }
    }
}