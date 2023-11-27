const { model, Schema } = require("mongoose");

const schema = new Schema({
    //The ID of the loggedIn user
    userId : {default : undefined, type : String},
    //The name of the file saved by a user
    fileName : {default : undefined, type : String}
})

module.exports = model('upload', schema, 'uploads')