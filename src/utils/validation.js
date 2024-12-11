const validator = require("validator");

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId,",
    "age",
    "gender",
    "skills",
  ];
  const isEditAllowed=Object.keys(req.keys).every((field)=>{
    allowedEditFields.includes(field)
  })
  return isEditAllowed;
};

module.exports={validateEditProfile};