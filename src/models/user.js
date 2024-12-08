const mongoose = require("mongoose");

const validator=require("validator")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength:2,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isEmail(value))
        throw new Error("Not valid");
    }
  },
  password: {
    type: String,
    validate(value){
      if(!validator.isStrongPassword(value))
        throw new Error("Not valid");
    }
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
  },
  skills:{
    type:[String],
  }
},{
  timestamps:true,
});


module.exports=mongoose.model("User",userSchema);