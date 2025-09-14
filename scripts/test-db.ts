import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
const uri=process.env.MONGODB_URI;
async function testConnection() {
    try{
        if(!uri){throw new Error("mongodb_uri not found in env.local file")}
        await mongoose.connect(uri,{
            dbName:"startup-connect"
        });
        console.log("the connection to db is done")
        await mongoose.disconnect();
        
    }
    catch(error){
        console.error("connect to db is filed",error)
    }  
}
testConnection()
