const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');
const Video = require('../../models/video');
const request = require('supertest');
const app = require('../../app');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('POST', () => {
  /**it('returns 201 for a new video post', async () => {
    const videoToCreate = buildVideoObject();
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);
    assert.equal(response.status, 201);
  });*/
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