const {assert} = require('chai');
const {seedVideoToDatabase, parseTextFromHTML} = require('../test-utils');
const Video = require('../../models/video');
const request = require('supertest');
const app = require('../../app');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /', () => {

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders existing videos', async () => {
      const video = await seedVideoToDatabase();

      const response = await request(app)
      .get(`/`);

      assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
    });
  });
});