const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors()); //The cors() middleware helps you manage CORS restrictions and allow or disallow cross-origin requests.
//app.use(cors()) allows  your server to respond to requests from different origins, making it possible for your frontend to communicate with the server.
app.use(express.json()); //When you use app.use(express.json()), you enable this middleware to be executed for every incoming HTTP request, so it automatically parses the request body as JSON when applicable.

// respond with "hello world" when a GET request is made to the homepage

//sohrawardy1998

//gqWeIFD6NSoD9rkd

//application code starts

const uri =
  "mongodb+srv://sohrawardy1998:gqWeIFD6NSoD9rkd@cluster0.ymyoldm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // Connect to the "usersDB" database and access its "haiku" collection
    const database = client.db("usersDB");
    const haiku = database.collection("users");

    //CRUD -> R (Read)
    app.get("/users", async (req, res) => {
      const cursor = haiku.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //CRUD -> U (Update)
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await haiku.findOne(query);
      res.send(user);
    });

    //CRUD -> C (create)
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);
      // Insert the defined document into the "haiku" collection
      const result = await haiku.insertOne(user);
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      console.log(updatedUser);
    });

    //CRUD -> D (Delete)
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("please delete from data base", id);
      const query = { _id: new ObjectId(id) };
      const result = await haiku.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

//application code ends

app.get("/", (req, res) => {
  res.send("Simple CRUD is running");
});

app.listen(port, () => {
  `simple crud is listening on port, ${port}`;
});
