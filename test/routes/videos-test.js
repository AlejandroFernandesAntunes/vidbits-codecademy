const {assert} = require('chai');
const {buildVideoObject, parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const Video = require('../../models/video');
const request = require('supertest');
const app = require('../../app');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('POST', () => {
  it('returns 201 for a new video post', async () => {
   // const videoToCreate = await seedVideoToDatabase();
   // assert.equal(response.status, 302);
  });
});

describe('Saves the video in the db', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('saves the video', async () => {
    const videoToCreate = buildVideoObject();
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);
    const createdVideo = await Video.findOne(videoToCreate);
    assert.equal(videoToCreate.title, createdVideo.title);
    assert.equal(videoToCreate.description, createdVideo.description);
  });
});

describe('Field validations', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('missing title', async () => {
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send({title: '', description:'just a descrpiption'});
    const videos = await Video.find({});
    assert.equal(videos.length, 0);
  });

  it('shows an error if title missing', async () => {
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send({title: '', description:'just a descrpiption'});
    const videos = await Video.find({});
    assert.include(parseTextFromHTML(response.text, 'body'), 'title is required');
  })
})

describe('GET /videos/:id', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  // Write your test blocks below:
  it('renders the video', async () => {
    const video = await seedVideoToDatabase();
    const response = await request(app)
      .get(`/videos/${video._id}`);
    assert.include(parseTextFromHTML(response.text, 'body'), video.title);
  })
});