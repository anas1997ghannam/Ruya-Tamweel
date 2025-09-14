//path:lib/mongoose.ts
import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI as string;
if(!MONGODB_URI){
    throw new Error("please add MONGODB_URI to .env.local")
}
let cached=(global as any).mongoose;
if(!cached){
    cached=(global as any).mongoose={conn:null,promise:null}
}
export async function connectToDataBase() {
    console.log("connect to db: ",MONGODB_URI)
    if(cached.conn){

        return cached.conn
    }
    if(!cached.promise){
        cached.promise=mongoose.connect(MONGODB_URI,{dbName:"startup-connect"})
    }
    cached.conn=await
    cached.promise
    return cached.conn
}


/*
TO DISPLAY COLLECTIONS IN YOUR DB
in shell:=>
mongosh "mongodb+srv://AnasGh:Q5RvyiD.8sznZpB@firstapi.iy9xb8q.mongodb.net/?retryWrites=true&w=majority&appName=FirstApi"
in mongoshell=>
Atlas atlas-allliq-shard-0 [primary] graduationDB> use startup-connect
switched to db startup-connect
Atlas atlas-allliq-shard-0 [primary] startup-connect> show collections
projects
users
Atlas atlas-allliq-shard-0 [primary] startup-connect> db.users.find().pretty()
[
  {
    _id: ObjectId('68148363c2dc2b435c45709d'),
    fullName: 'anas',
    email: 'anasghannam9797@gmail.com',
    password: '$2b$10$n1Jq5bUpc5k/ZLUR6TULBu6lTQ2/L0yN53O04y9UfrjzeaeNbQ6.C',
    phone: '0954980045',
    role: 'entrepreneur',
    bio: 'information tec',
    __v: 0
  }
]
 */