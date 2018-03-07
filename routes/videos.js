const router = require('express').Router();
const Video = require('../models/video');
module.exports = router;

router.get('/', async (req, res) =>{
  const videos = await Video.find({});
  res.render('index', {videos});
})

router.get('/create', async (req, res, next) => {
  res.render('create');
});

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  const newVideo = new Video({title, description});
  if (newVideo.title) {   
    await newVideo.save();
    res.status(201);
    res.render('show', {newVideo})  
  } else {
    res.status(400);
    const error = 'title is required'
    res.render('create', {error, newVideo})  
  }
})
