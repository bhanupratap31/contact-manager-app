const express = require("express"); 
const router=express.Router();
const {getContact,createContact,getsContact,updateContact,deleteContact} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getsContact).put(updateContact).delete(deleteContact);


module.exports=router;