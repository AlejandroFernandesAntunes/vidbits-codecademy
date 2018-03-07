const router = require('express').Router();
const Video = require('../models/video');
module.exports = router;

router.get('/', (req, res) =>{
  res.render('index')
})

router.get('/create', async (req, res, next) => {
  res.render('create');
});

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  const newVideo = new Video({title, description});
  await newVideo.save();
  res.status(201);
  res.render('show', {newVideo})
})
