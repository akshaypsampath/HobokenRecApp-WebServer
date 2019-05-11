// const mongoCollections = require("../config/db/mongoCollections");
// const rosters = mongoCollections.Rosters;
// const teamList = mongoCollections.TeamList;
// // const Data = require("../data");
// // const teamListData = Data.teamList;
// const { ObjectId } = require('mongodb');
// const _ = require('lodash');


// // const main = async() => {
    
// //     await teamListData.read("5cd1b56f022d643dcd201ba4")
// // }
// // main()
// module.exports = {
//     async create(teamId) {
//         // for(var prop in teamListData){
//         //      console.log(prop)
//         // }
//         console.log("teamId: ", teamId);
//         if(!teamId){
//             throw "Must provide a teamId";
//         }
        
//         if (typeof teamId != 'string') throw "Must provide a teamId of type string";
//         // console.log(`Team List ${t}`)
//         try {
//             const teamListCollection = await teamList();
//             const teamIdObj = new ObjectId(teamId);
//             const team = await teamListCollection.findOne({_id:teamIdObj});

//             if(team==null){ throw "cannot create a roster for a team that doesn't exist." }

//             const rostersCollection = await rosters();

//             let newRoster = {

//                 teamId: teamIdObj,
//                 playerList: []
//             };

//             const insertData = await rostersCollection.insertOne(newRoster);
//             if (insertData.count === 0) throw "Could not add team";
        
//             const newId = insertData.insertedId;
//             let idStr = newId.toString();
//             //console.log(newId, idStr);
        
//             const tempRoster = await module.exports.read(idStr);
//             return tempRoster;
//     }  catch(e) {
//         console.log(`Error in ROsters ${e}`)
//     }
//     },
//     read: async (id) => {
//         if (!id) throw "Must provide a valid Id";
//         if (typeof id != 'string') throw "Must provide an Id of string type";
//         //console.log(id)
//         const idObj = new ObjectId(id)

//         const rostersCollection = await rosters();
//         const tempRoster = await rostersCollection.findOne({ _id: idObj });

        
//         // if (tempRoster === null) throw "No roster with that Id";
//         //console.log(tempAnimal);
//         return tempRoster;
//     },
//     readAll: async() => {
//         // if (!id) throw "Must provide a valid Id";
//         // if (typeof id != 'string') throw "Must provide an Id of string type";
//         //console.log(id)
//         //const idObj = new ObjectId(id)

//         const rostersCollection = await rosters();


//         const tempRoster = await rostersCollection.find({}).toArray();
//         //console.log(animalData)

//         // for(let i=0; i<tempPost.length; i++){
//         //     //console.log( tempPost[i].author.toString());
//         //     const obj = await animalData.get(tempPost[i].author.toString());
//         //     tempPost[i].author = {_id: obj._id, name: obj.name};
//         // }
//         if (tempRoster === null) throw "No rosters found";
//         //console.log(tempAnimal);
//         return tempRoster;
//     },
//     updateName: async(id, teamName) => { //needs to be updated
//         if (!id) throw "Must provide a valid Id";
//         if (typeof id != 'string') throw "Must provide an Id of string type";

//         if (!teamName) throw "Must provide a valid Team Name";
//         if (typeof teamName != 'string') throw "Must provide a Team Name of string type";

//         const idObj = new ObjectId(id)

//         const rostersCollection = await rosters();
//         const tempRoster = await rostersCollection.findOne({ _id: idObj });
//         console.log(tempRoster)
//         if (tempRoster === null) throw "No Roster with that Id";

//         const updatedData = await rostersCollection.updateOne({ _id: idObj }, {$set: {teamName:teamName}});

//         if (updatedData.modifiedCount === 0) {
//             throw "could not update Roster successfully";
//         }
//         const modObj = await module.exports.read(id);
//         console.log(modObj)
//         return modObj;

//         // if(newContent!=undefined && newTitle != undefined){
            
//         // }

//         // if (newContent==undefined) //throw "Must provide a valid teamName";
//         // {
//         //     const updatedData = await animalCollection.updateOne({ _id: idObj }, {$set: {content:newContent}});
            
//         //     if (updatedData.modifiedCount === 0) {
//         //         console.log(updatedData.modifiedCount);
//         //         throw "could not update animal successfully";
//         //     }
//         //     return await module.exports.read(id);

//         // }
//         // if (newTitle==undefined) //throw "Must provide a valid teamName";
//         // {
//         //     const updatedData = await animalCollection.updateOne({ _id: idObj }, {$set: {content:newContent}});
            
//         //     if (updatedData.modifiedCount === 0) {
//         //         throw "could not update animal successfully";
//         //     }
//         //     return await module.exports.read(id);
//         // }
//         // //if (typeof teamName != 'string') throw "Must provide a teamName of string type";

//         // if (!content) throw "Must provide valid content";
//         // if (typeof content != 'string') throw "Must provide content of string type";
//     },
//     createPlayer: async(id, playerName) =>{
//         if (!id) throw "Must provide a valid Id";
//         if (typeof id != 'string') throw "Must provide an Id of string type";

//         if (!playerName) throw "Must provide a valid Player Name";
//         if (typeof playerName != 'string') throw "Must provide a Player Name of string type";

//         const tempRoster = await module.exports.read(id);
//         const playerId = new ObjectId();

//         let newPlayer = {
//             playerId: playerId,
//             playerName: playerName
//         };

//         tempRoster.playerList.push(newPlayer);

//         const modObj = await module.exports.read(id);
//         console.log(modObj);
//         return modObj;
//     },
//     deletePlayer: async(id, playerId) =>{
//         if (!id) throw "Must provide a valid Id";
//         if (typeof id != 'string') throw "Must provide an Id of string type";

//         if (!playerId) throw "Must provide a valid Player Id";
//         if (typeof playerId != 'string') throw "Must provide a Player Id of string type";

//         const tempRoster = await module.exports.read(id);
        
//         const deletedObj = _.remove(tempRoster.playerList, function(player){return player.playerId == playerId});
//         if(!deleteObj) { throw "Player not found in this Roster"}

//         const modObj = await module.exports.read(id);
//         console.log(modObj);
//         return modObj;
//     },    
//     delete: async(id) => { ////needs to be updated
//         if (!id) throw "Must provide a valid Id";
//         if (typeof id != 'string') throw "Must provide an Id of string type";

//         const idObj = new ObjectId(id)

//         const teamListCollection = await teamList();
//         const deletionInfo = await teamListCollection.removeOne({ _id: idObj });
//         if (deletionInfo.deletedCount === 0) {
//             throw `Could not delete post with id of ${id}`;
//         }
//     }
// }
