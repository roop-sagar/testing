const mongoose = require("mongoose");
const express = require('express');
const Data = require('./modal');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://roop_sagar:apple0420@cluster0.klycv5u.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log('db connection established');
});

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/',async(req,res)=>{
    let info = await Data.find();
    res.send(info)
});
app.post('/send', async(req,res)=>{
    const {name, email, password} = req.body;
    let newData = new Data({
        name,email,password
    });
    console.log(req.body);
    await newData.save();
    res.send('Saved');

});
app.listen(5000, ()=> console.log('server running....'));