const express = require("express");
const cors = require("cors");
const app = express();
const port = process.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsx9xso.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const taskCollection = client.db("task-manager").collection("tasks");



    // Task
    app.post("/api/v1/dashboard/add-a-task", async(req, res)=>{
      const taskData = req.body;
      const result = await taskCollection.insertOne(taskData);
      console.log(result);
      res.send(result)
    }) 

    app.get("/api/v1/dashboard/get-tasks", async(req, res)=>{
      const result = await taskCollection.find().toArray();
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Task management is running");
});

app.listen(port, () => {
  console.log(`Task Management is running on port ${port}`);
});
