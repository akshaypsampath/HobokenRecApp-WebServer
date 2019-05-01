const mongoCollections = require("../config/db/mongoCollections");
const Users = mongoCollections.Users;
const { ObjectId } = require('mongodb');

module.exports = {
    create: async (username, hashedPassword, type, sport) =>{
        if(!username){
            throw "Must provide a username";
        }
        if(!hashedPassword){
            throw "Must provide a hashedPassword";
        }
        // if(!type){
        //     throw "Must provide a user type";
        // }
        // if(!sport){
        //     throw "Must provide a list of sports";
        // }
        // if (typeof username != 'string') throw "Must provide a username of type string";
        // if (typeof hashedPassword != 'string') throw "Must provide a hashedPassword of type string";



        const UsersCollection = await Users();

        let newUser = {
            
            username: username,
            hashedPassword: hashedPassword 
        };

        const insertData = await UsersCollection.insertOne(newUser);
        if (insertData.count === 0) throw "Could not add user";
    
        const newId = insertData.insertedId;
        let idStr = newId.toString();
        //console.log(newId, idStr);
    
        const user = await module.exports.read(idStr);
        return user;
    },
    find: async(username) =>{
        if (!username) throw "Must provide a valid username";
        if (typeof username != 'string') throw "Must provide a username of string type";
        console.log(username);

        const UsersCollection = await Users();
        const tempUser = await UsersCollection.findOne({ username: username });

        
        //if (tempUser === null) throw "No user with that Id";
        //console.log(tempAnimal);
        return tempUser;


    },
    read: async(id) => {
        console.log(typeof id)
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'string' ) {//throw "Must provide an Id of string type"
            const idObj = id;
            const UsersCollection = await Users();
            const tempUser = await UsersCollection.findOne({ _id: idObj });

            if (tempUser === null) throw "No user with that Id";
            //console.log(tempAnimal);
            return tempUser;
        }
        else if ( typeof id != "object") {
            // console.log("not object");
            const idObj = new ObjectId(id);
            const UsersCollection = await Users();
            const tempUser = await UsersCollection.findOne({ _id: idObj });

            if (tempUser === null) throw "No user with that Id";
            //console.log(tempAnimal);
            return tempUser;
        }
        else{
            throw "No user found";
        }
    },
    updateTypeSport: async(id, newType, newSport) => { //needs to be updated
        if (!id) throw "Must provide a valid Id";
        if (typeof id != 'object') throw "Must provide an Id of object type";
    
        if (!newType) throw "Must provide a valid type";
        if (typeof newType != 'string') throw "Must provide a Type as string";
        if (!newSport) {
            newSport = [];
        }//throw "Must provide a valid Id";
        // if (typeof newSport != 'object') throw "Must provide an array of Sports";

        // console.log(newType);
        // console.log(newSport);

        // const idObj = new ObjectId(id)

        const UsersCollection = await Users();
        const tempUser = await UsersCollection.findOne({ _id: id });
        console.log(tempUser)
        if (tempUser === null) throw "No user with that Id";

        const updatedData = await UsersCollection.updateOne({ _id: id }, {$set: {type:newType, sport:newSport}});

        if (updatedData.modifiedCount === 0) {
            throw "could not update user successfully";
        }
        const modObj = await module.exports.read(id);
        console.log(modObj)
        return modObj;
    }
    // readAll: async() => {
    //     // if (!id) throw "Must provide a valid Id";
    //     // if (typeof id != 'string') throw "Must provide an Id of string type";
    //     //console.log(id)
    //     //const idObj = new ObjectId(id)

    //     const teamListCollection = await teamList();


    //     const tempTeam = await teamListCollection.find({}).toArray();
    //     //console.log(animalData)

    //     // for(let i=0; i<tempPost.length; i++){
    //     //     //console.log( tempPost[i].author.toString());
    //     //     const obj = await animalData.get(tempPost[i].author.toString());
    //     //     tempPost[i].author = {_id: obj._id, name: obj.name};
    //     // }
    //     if (tempTeam === null) throw "No teams found";
    //     //console.log(tempAnimal);
    //     return tempTeam;
    // },
    // update: async(id, newTitle, newContent) => { //needs to be updated
    //     if (!id) throw "Must provide a valid Id";
    //     if (typeof id != 'string') throw "Must provide an Id of string type";

    //     console.log(newTitle);
    //     console.log(newContent);

    //     const idObj = new ObjectId(id)

    //     const postCollection = await posts();
    //     const tempPost = await postCollection.findOne({ _id: idObj });
    //     console.log(tempPost)
    //     if (tempPost === null) throw "No animal with that Id";

    //     if(newContent!=undefined && newTitle != undefined){
    //         const updatedData = await postCollection.updateOne({ _id: idObj }, {$set: {teamName:newTitle, content:newContent}});

    //         if (updatedData.modifiedCount === 0) {
    //             throw "could not update animal successfully";
    //         }
    //         const modObj = await module.exports.read(id);
    //         console.log(modObj)
    //         return modObj;
    //     }

    //     if (newContent==undefined) //throw "Must provide a valid teamName";
    //     {
    //         const updatedData = await animalCollection.updateOne({ _id: idObj }, {$set: {content:newContent}});
            
    //         if (updatedData.modifiedCount === 0) {
    //             console.log(updatedData.modifiedCount);
    //             throw "could not update animal successfully";
    //         }
    //         return await module.exports.read(id);

    //     }
    //     if (newTitle==undefined) //throw "Must provide a valid teamName";
    //     {
    //         const updatedData = await animalCollection.updateOne({ _id: idObj }, {$set: {content:newContent}});
            
    //         if (updatedData.modifiedCount === 0) {
    //             throw "could not update animal successfully";
    //         }
    //         return await module.exports.read(id);
    //     }
    //     //if (typeof teamName != 'string') throw "Must provide a teamName of string type";

    //     // if (!content) throw "Must provide valid content";
    //     // if (typeof content != 'string') throw "Must provide content of string type";


    // },
    // delete: async(id) => { ////needs to be updated
    //     if (!id) throw "Must provide a valid Id";
    //     if (typeof id != 'string') throw "Must provide an Id of string type";

    //     const idObj = new ObjectId(id)

    //     const postCollection = await posts();
    //     const deletionInfo = await postCollection.removeOne({ _id: idObj });
    //     if (deletionInfo.deletedCount === 0) {
    //         throw `Could not delete post with id of ${id}`;
    //     }
    // }
}