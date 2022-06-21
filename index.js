const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const useRouter = require('./routes/user.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
//database connection
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('Open',()=>console.log("Connected to the database"));

app.use('/user',useRouter);

app.get('/',(req,res)=>{
    console.log("This is running...");
    res.send("This is our Homepage");
})

app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`));