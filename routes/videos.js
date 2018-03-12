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

router.get('/videos/:id', async (req, res) => {
  const id = req.params.id
  const video =  await Video.findOne({_id: id});

  res.render('show', {video})
})

router.get('/videos/:id/edit', async (req, res) => {
  const id = req.params.id
  const video =  await Video.findOne({_id: id});

  res.render('edit', {video})
})

router.post('/updates', async (req, res, next) => {
  const id = req.body._id
  const { title, description, url  } = req.body;
  const video =  await Video.findOne({_id: id});
  video.title = title;
  video.description = description;
  video.url = url;
  video.validateSync();
  if (video.errors) {
    res.status(400);
    var error = 'Undefined problem'
    if (video.errors['title']) {
      error = video.errors['title'].message 
    } else if (video.errors['url']){
      error = video.errors['url'].message 
    }
    res.render('edit', {error, video})
  } else {
    await video.save();
    res.redirect(302, `/videos/${video._id}`)
  }
})

router.post('/videos', async (req, res) => {
  const {title, description, url} = req.body;
  const video = new Video({title, description, url});
  video.validateSync();
  if (video.errors) {
    res.status(400);
    var error = 'Undefined problem'
    if (video.errors['title']) {
      error = video.errors['title'].message 
    } else if (video.errors['url']){
      error = video.errors['url'].message 
    }
    res.render('create', {error, video})
  } else {
    await video.save();
    res.redirect(302, `/videos/${video._id}`)
  }
})
