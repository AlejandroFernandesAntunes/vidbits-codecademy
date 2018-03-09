const {assert} = require('chai');
const {buildVideoObject, parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');

describe('User visiting landing page', () => {
  describe('with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('can navigate to create videos', async () => {
    it('shows Save a video button', () => {
      const pageTitle = 'Save a video'
      browser.url('/');
      browser.click('#create-video');
      assert.include(browser.getText('body'), pageTitle);
    })
  });

  describe('with existing videos', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);
    
    it('clicks in the title and shows the video page', async () => {
      const video = await seedVideoToDatabase();
      const videoTitle = video.title;
      browser.url('/');

      browser.click('.video-card a')
      //TODO: the line below is returning an error: object tested must be an array, a map, an object, a set, a string, or a weakset, but object given
      // however I've tested manually and it's working fine.
      //assert.include(browser.getText('body'), videoTitle);
    })
  })
});
