const mongoose = require("mongoose"); 

const userSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User",
    },
    username:{
        type: String,
        required: [true, "Please add the username"],
    },
    email:{
        type: String, 
        required: [true, "Please provide the email id"], 
        unique: [true, "Email address already taken!"],
    }, 
    password: {
        type: String, 
        required: [true, "Please provide the password"], 
    },

}, {
    timestamps: true,
}); 

module.exports = mongoose.model("User", userSchema);
