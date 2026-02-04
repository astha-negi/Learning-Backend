const mongo = require('mongodb');   
 const MongoClient = mongo.MongoClient;
 const MONGO_URL = "mongodb+srv://astha:Astha27@cluster0.ckrdv3g.mongodb.net/?appName=Cluster0"
let _db;

  const mongoConnect = (callback)=>{
    MongoClient.connect(MONGO_URL)
   .then(client => {
       callback();
         _db= client.db("airbnb");
   })
   .catch(err => {
       console.log("Failed to connect to MongoDB", err);
   });
  }
  const getDb= ()=>{
    if(!_db){
      throw "No database found!";
    }
    return _db;
  }
  exports.getDb= getDb;
  exports.mongoConnect= mongoConnect;