const mongoose = require("mongoose");
const express = require("express");
const Data = require("./modal");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");

const app = express();

dotenv.config();
let PORT = process.env.PORT;
let JWT_SECRET = process.env.JWT_SECRET_KEY;

mongoose.connect(
  "mongodb+srv://roop_sagar:apple0420@cluster0.klycv5u.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("db connection established");
  }
);

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", async (req, res) => {
  let info = await Data.find();
  res.send(info);
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let exist = await Data.findOne({ email });
  if (exist) {
    return res.send({
      message: "User already exists",
    });
  }
  let newData = new Data({
    name,
    email,
    password,
  });
  console.log(req.body);
  await newData.save();
  res.send({
    message: "Registration successful",
  });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let exist = await Data.findOne({ email });
  if (!exist) {
    return res.send({
      message: "User Not Found",
    });
  }
  if (password !== exist.password) {
    return res.send({
        message: "Password incorrect",
      });
  }
  let payload ={
    user:{
        _id: exist._id
    }
  }
 
  jwt.sign(payload,JWT_SECRET,{expiresIn:60000},
    (err,token)=>{
        if (err) throw err;
        return res.json({token})
    })

});
app.get('/dashboard', middleware, async (req, res) =>{
  try {
    let exist = await Data.findById(req.user.id);
    if (!exist) {
      return res.send('User not found');}
    res.json(exist);
    } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
})

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
