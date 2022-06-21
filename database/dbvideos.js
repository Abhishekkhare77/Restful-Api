const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    video:{
        data:Buffer,
        contentType: String
    }
});
module.exports = VideoModel=mongoose.model("videoModel",videoSchema);