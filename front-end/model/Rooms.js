const mongoose = require("mongosse");

const { Schema } = mongoose;

const roomSchemaPublic = new Schema({
   
    name :{
        type : String
    },

chain:{
    type: String
},
    tokenType:{
        type: String
    },

    contractAddress:{
        type : String
    },


    interest :{
        trype: String
    },


    capacity:{
        type : Number,
        min:2,
        max:20
    }

    // isPublic()

  });
  