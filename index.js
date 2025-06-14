// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://tulasivaindamfed9:Mongodbatlas12%40@cluster0.qxtdem0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const client = new MongoClient(uri);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB Atlas!");

//         const db = client.db("testdb");
//         const collection = db.collection("testcollection");

//         // Example: Insert a document
//         await collection.insertOne({ name: "Tulasi", role: "frontend developer" });

//         const results = await collection.find().toArray();
//         console.log(results);

//     } catch (err) {
//         console.error(err);
//     } finally {
//         await client.close();
//     }
// }

// run();
