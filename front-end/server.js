const express = require('express')
const app = express()
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const ethers = require("ethers");

const port = 3000

app.use(express.json());


app.set('view engine', 'jade');
// I am not getting inputed dat aand created database in the compass
// API is getting called but I am not to access the data 

mongoose.connect('mongodb://127.0.0.1:27017/HuddleDatabase',{
  dbName : "HuddleDatabase",
})
.then(()=>console.log("Database connected"))
.catch((e)=>console.log(e))



app.get("/creatingroom",(req,res)=>{

    res.render("");

})

 // for users to join a private room
// app.get("/joininPrivateRoom", async(req,res)=>{

//   const response = await axios.post(
//     'https://api.huddle01.com/api/v1/join-room-token',
//     {
//         roomId:req.body.roomId ,                     // "jkb-yqis-bqg"
//         userType: req.body.userType                // either host or guest in front end 
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': {wWEukbne5VadgXfQciIpymOmgcOjrqOW},
//       },
//     }
//   );




// });



app.post("/creatingroom",async(req,res)=>{


if(!isPublic){

  console.log("------Reaching the post block------");
  const data = roomSchema(req.body);
  // console.log(data);           -- working
  await data.save();            //-- not workinhg I think 
  // priavte room dta is not required to be saved in compass ??

const API_KEY = process.env.API_KEY;

  const response = await axios.post(
    'https://api.huddle01.com/api/v1/create-room',
    {
        "title": req.body.name,
        "tokenType": req.body.tokenType,
        "chain": req.body.chain,
        "contractAddress": [req.body.contractAddress]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': {wWEukbne5VadgXfQciIpymOmgcOjrqOW},
      },
    }
  );
  console.log(response.data.roomId);
}
// add to the front end the room id and the message after room creation 
// call the joinPrivateRoom as a host from here 

// else{
// // making a general room 
// const response = await axios.post(
//   'https://api.huddle01.com/api/v1/create-room',
//   {
//     title: 'Huddle01-Test',
//     hostWallets: ['0x29f54719E88332e70550cf8737293436E9d7b10b'],
//   },
//   {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': {{API_KEY}},
//     },
//   }
// );


// }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
