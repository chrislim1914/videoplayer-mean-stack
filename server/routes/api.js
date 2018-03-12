const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://chrislim1914:miesposa1914@ds133961.mlab.com:33961/videoplayer')
    .then(() => { // if all is ok we will be here
      console.log('connected to Mlab');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

router.get('/', function(req, res) {
    res.send('express route is working');
});

router.get('/videos', function(req, res) {
    Video.find({})
    .exec(function(err, videos) {
        if(err) {
            console.log('Error in retrieving videos');
        } else {
            res.json(videos);
        }
    });
});

router.get('/videos/:id', function(req, res) {
    Video.findById(req.params.id)
    .exec(function(err, video) {
        if(err) {
            console.log('Error in retrieving videos');
        } else {
            res.json(video);
        }
    });
});

router.post('/video', function(req, res) {
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo) {
        if(err) {
            console.log('Error in saving video');
        } else {
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', function(req, res) {
    Video.findByIdAndUpdate(req.params.id, 
        {
            $set: {title: req.body.title, url: req.body.url, description: req.body.description}
        },
        {
            new: true
        },
        function(err, updatedVideo) {
            if(err) {
                console.log('Error in Updating video');
            } else {
                res.json(updatedVideo);
            }
        }
    )
});

router.delete('/video/:id', function(req, res) {
    Video.findByIdAndRemove(req.params.id, function(err, deleteVideo) {
        if(err) {
            console.log('Error in deleting Video');
        } else {
            res.json(deleteVideo);
        }
    });
});

module.exports = router;