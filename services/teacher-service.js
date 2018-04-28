const MongoClient = require('mongodb').MongoClient;
const ENV_CONST = require('../environment.const');


findAllTeachers = () =>{
    return new Promise((resolve, reject) =>
    {
        MongoClient.connect(ENV_CONST.DB_URL, (err, db) => {
            if (err) throw err;
            let dbo = db.db("socassist");
            dbo.collection("teachers").find().toArray((err, result) => {
                if (err) throw err;
                console.dir(result);
                db.close();
                resolve(result);
            });
        });
    })
};
module.exports.findAllTeachers = findAllTeachers;


