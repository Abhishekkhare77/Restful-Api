const express = require('express');
const router = express.Router();
const ImageModel = require('../database/dbschema');
const VideoModel = require('../database/dbvideos');
const multer = require('multer');
var path = require('path');

//Post and get methods
const imageStorage = multer.diskStorage({    
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});
const imageUpload = multer({
    storage: imageStorage,
}).single('testImage')

router.post('/uploadImage', (req, res) => {
    imageUpload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            const newImage = new ImageModel({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType : "image/png",
                },
            })
            newImage.save()
                .then(()=>res.send("Successfully Uploaded"))
                .catch(err=>console.log(err));
        }
    })
})
 const videoStorage = multer.diskStorage({
    destination: 'videos', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
         + path.extname(file.originalname))
    }
});
const videoUpload = multer({
    storage: videoStorage,
}).single('testVideo')
router.post('/uploadVideo', (req, res) => {
    videoUpload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            const newVideo = new VideoModel({
                name:req.body.name,
                video:{
                    data:req.file.filename,
                    contentType : "video/mp4",
                },
            })
            newVideo.save()
                .then(()=>res.send("Successfully Uploaded"))
                .catch(err=>console.log(err));
            }
    })
})
//delete method 
router.delete('/:name', (req, res, next) => {
    ImageModel.deleteOne({name: req.params.name}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
});
router.delete('/:name', (req, res, next) => {
    VideoModel.deleteOne({name: req.params.name}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
});

router.get('/',(req,res)=>{
    console.log("Running");
    res.send("Hello, Welcome to home page ..");
})

module.exports = router;