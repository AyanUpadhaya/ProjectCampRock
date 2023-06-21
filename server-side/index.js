const express = require('express');
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const secret = process.env.SECRET_KEY;
const port = process.env.PORT || 6000;

const app = express();
//middlewares
app.use(cors());
app.use(express.json());

//jwt verification
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).send({ error: true, msg: 'unauthorized access' })
  }

  const token = authorization.split(' ')[1]
  //verify token here

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(403).send({ error: true, msg: "forbidden access" })
    }
    req.decoded = decoded
    next()
  })
}


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://ayan:<password>@cluster6.hvw50la.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster6.hvw50la.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    //database collection
    const userCollection = client.db('campRockDB').collection('userCollection');
    const classCollection = client.db('campRockDB').collection('classCollection');

    //student
    const addedClassCollection = client.db('campRockDB').collection('addedClassCollection');
    //payment
    const paymentsCollection = client.db('campRockDB').collection('payments');


    //Generate jwt token

    app.post('/jwt', (req, res) => {
      const user = req.body;
      const accessToken = jwt.sign(user, secret, { expiresIn: '1h' });
      res.send({ token: accessToken })
    })

    //USERS API

    //create new user
    app.post('/api/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      //find the exiting user
      const exiting = await userCollection.findOne(query);
      if (exiting) {
        return res.send({ notAccepted: true, message: 'user already exist' })
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result)
      }

    })
    //admin verification
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query)
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, msg: "forbidden access" })
      }
      next()
    }
    // =======================================
    //      USER SECTION
    // =======================================
    //get all users
    app.get('/api/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })
    //todo: add jwt
    //update user role
    app.put('/api/users/:email',verifyToken,async (req, res) => {
      const email = req.params.email;
      const updateRole = req.body;
      const filter = { email: email }
      const updateDoc = {
        $set: {
          role: updateRole.role
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result)
    })
    //update user profile
    app.put('/api/users/profile/:email',verifyToken,async (req, res) => {
      const email = req.params.email;
      const {name,photo} = req.body;
      const filter = { email: email }
      const updateDoc = {
        $set: {
          name,
          image:photo
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result)
    })

    //check user role
    app.get('/api/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const user = await userCollection.findOne(query)

      if (!user) {
        return res.status(404).send({ error: true, msg: 'User not found' })
      }
      res.send({ role: user.role })
    })

    // =======================================
    //      INSTRUCTOR SECTION
    // =======================================

    app.post('/api/classes',verifyToken,async (req, res) => {
      const { className, classImage, instructorName, instructorEmail, availableSeats, price } = req.body;
      //create new class
      const newClass = {
        className,
        classImage,
        instructorName,
        instructorEmail,
        availableSeats:parseInt(availableSeats),
        price:parseFloat(price),
        status: 'pending',
        enrolledStudents: 0,
        feedback: ''
      }
      const result = await classCollection.insertOne(newClass)
      return res.send(result)
    })

    //GET all classes
    app.get('/api/classes', async (req, res) => {
      const result = await classCollection.find().toArray()
      return res.send(result)
    })
    //get class by id
    app.get('/api/classes/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await classCollection.findOne(query)
      res.send(result)
    })
    //update class
    app.put('/api/classes', verifyToken, async (req, res) => {
      const {
        className,
        classImage,
        instructorName,
        instructorEmail,
        availableSeats,
        price,
        _id } = req.body;
      const filter = { _id: new ObjectId(_id) }
      const updateDoc = {
        $set: {
          className,
          classImage,
          instructorName,
          instructorEmail,
          availableSeats:parseInt(availableSeats),
          price:parseFloat(price)
        }
      }

      const result = await classCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    // ================
    //    SYSTEM
    //==================

    //update class by class id after payment
    app.put('/api/classes/:classId', verifyToken,async(req,res)=>{
      const classId = req.params.classId
      //find the class he has been enrolled
      const query = {_id:new ObjectId(classId)}
      const enrolledClass = await classCollection.findOne(query)

      //destructure
      const {availableSeats,enrolledStudents} = enrolledClass;

      //now to update
      const filter={_id:new ObjectId(classId)}

      const updateDoc ={
        $set:{
          availableSeats:parseInt(availableSeats)-1,
          enrolledStudents:parseInt(enrolledStudents)+1,
        }
      }
      const result = await classCollection.updateOne(filter,updateDoc)
      res.send(result)

    })

    //DELETE class after payment from addedClassCollection
    app.delete('/api/classes/:classId',verifyToken,async(req,res)=>{
      const classId = req.params.classId
      const query = {classId:classId}
      const result = await addedClassCollection.deleteOne(query);
      res.send(result)
    })

    app.get('/api/instructor/classes', async (req, res) => {
      const email = req.query.email;
      const query = { instructorEmail: email };
      const classes = await classCollection.find(query).toArray();
      return res.send(classes);
    });
    

    //update classes status

    app.patch('/api/classes', verifyToken, async (req, res) => {
      const { id, status, feedback } = req.query;

      if (!id) {
        return res.status(400).send({ message: 'ID not found' })
      }


      const updateDoc = {}
      if (status) {
        updateDoc.$set = { status }
      }
      if (feedback) {
        updateDoc.$push = { feedback }
      }

      const filter = { _id: new ObjectId(id) }

      const result = await classCollection.updateOne(filter, updateDoc)

      return res.send(result)
    })
    //update classes feedback 

    app.patch('/api/classes/feedback', verifyToken, async (req, res) => {
      const { id, feedback } = req.query;

      if (!id) {
        return res.status(400).send({ message: 'ID not found' })
      }


      const updateDoc = {
        $set: {
          feedback
        }
      }


      const filter = { _id: new ObjectId(id) }

      const result = await classCollection.updateOne(filter, updateDoc)

      return res.send(result)
    })

    //for only instructors
    app.get('/api/instructors', async (req, res) => {
      const query = { role: 'instructor' }
      const result = await userCollection.find(query).toArray();
      res.send(result)
    })

    // =================================
    //      STUDENT
    // =================================

    app.post('/api/studentclass', verifyToken, async (req, res) => {
      const studentClass = req.body;
      const {sigNature} = studentClass;
      const query = { sigNature: sigNature };
      const existing = await addedClassCollection.findOne(query)
      if(existing){
        return res.status(401).send({error:true,message:'Already selected'})
      }else{
          const result = await addedClassCollection.insertOne(studentClass)
          res.send(result)
      }
    
    })
    //get selected class by searching through email
    app.get('/api/studentclass', verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await addedClassCollection.find(query).toArray();
      res.send(result);
    })
    //Delete selected class
    app.delete('/api/studentclass/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addedClassCollection.deleteOne(query);
      res.send(result);
    })

    //get payment information via email
    app.get('/api/payments/:email',verifyToken,async(req,res)=>{
      const email = req.params.email;
      const query = {email:email}
      const result = await paymentsCollection.find(query).toArray();
      res.send(result);
    })

    //get enrolled classes information
    app.get('/api/enrolled',verifyToken,async(req,res)=>{
      const classIds = req.query.ids;
      const query = { _id: { $in: classIds?.map((id) => new ObjectId(id))||[] } };
      const result = await classCollection.find(query).toArray();
      res.send(result);
    })

    //=========================
    //    PAYMENT
    // =========================

    //create payment intent
    app.post('/create-payment-intent',verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: [
          "card"
        ]
      })

      res.send({
        clientSecret:paymentIntent.client_secret,
      })
    })

    //payments related

    app.post('/payments',verifyToken,async(req,res)=>{
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      res.send(result);
    })
    app.get('/payments',verifyToken, async(req,res)=>{
      const result = await paymentsCollection.find().toArray();
      res.send(result);
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


app.get('/', (req, res) => {
  res.send('camp rock server running')
})

app.listen(port, () => console.log(`Server running on port : ${port}`))