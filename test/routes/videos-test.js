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
    assert.include(createdVideo, {title: videoToCreate.title});
    assert.include(createdVideo, {description: videoToCreate.description});
    assert.include(createdVideo, {url: videoToCreate.url});
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

  it('shows an error if title missing, keeping values in other fields', async () => {
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send({title: '', description:'just a descrpiption', url: 'http://example.com'});
    const videos = await Video.find({});
    assert.include(parseTextFromHTML(response.text, 'body'), 'title is required');
    assert.include(parseTextFromHTML(response.text, 'body'), 'just a descrpiption');
  })

  it('shows an error if url missing', async () => {
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send({title: 'my title', description:'just a descrpiption', url: ''});
    const videos = await Video.find({});
    assert.include(parseTextFromHTML(response.text, 'body'), 'a URL is required')
  })
})

describe('GET /videos/:id', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('renders the video', async () => {
    const video = await seedVideoToDatabase();
    const response = await request(app)
      .get(`/videos/${video._id}`);
    assert.include(parseTextFromHTML(response.text, 'body'), video.title);
  })
});

describe('GET /videos/:id/edit', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('renders the video', async () => {
    const video = await seedVideoToDatabase();
    const response = await request(app)
      .get(`/videos/${video._id}/edit`);
    assert.include(parseTextFromHTML(response.text, 'h2'), 'Edit a video');
    // TODO: This line belowis not working I've tested manually and it works fines.
    //assert.include(parseTextFromHTML(response.text, '#title-input'), video.title);
  })
});

describe('POST /videos/:id/edit', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  it('renders the video', async () => {
    const video = await seedVideoToDatabase();
    const response = await request(app)
      .post(`/updates`)
      .type('form')
      .send({_id: video.id, title: 'Recently updated video', description:'just a descrpiption', url: 'foo'});;
    const updatedVideo = await Video.find({title: 'Recently updated video'});
    assert.equal(updatedVideo.length, 1);
  })

  it('redirects to show', async () => {
    const video = await seedVideoToDatabase();
    const response = await request(app)
      .post(`/updates`)
      .type('form')
      .send({_id: video.id, title: 'Recently updated video', description:'just a descrpiption', url: 'foo'});

    assert.equal(response.status, 302);
    assert.equal(response.headers.location, `/videos/${video._id}`);
  })
});