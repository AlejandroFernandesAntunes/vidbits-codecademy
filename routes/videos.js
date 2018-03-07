const router = require('express').Router();
const Video = require('../models/video');
module.exports = router;

// POST video route
router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  const newVideo = new Video({title, description});
  await newVideo.save();
  res.status(201);
  res.render('show', {newVideo})
})
