const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Routes/userRoute')


const app = express();
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose.connect("mongodb+srv://varunparmarwork:admin@cluster0.gpirk.mongodb.net/").then(() => {
    console.log("Connected to Mongodb")
    })
  .catch(err => console.log('MongoDB connection error:', err));


// Routes
    app.use('/api/users', userRouter);



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  