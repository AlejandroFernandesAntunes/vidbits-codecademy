const {assert} = require('chai');

describe('User visiting landing page', () => {
  describe('with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('can navigate to create videos', () => {
    it('shows Save a video button', () => {
      const pageTitle = 'Save a video'
      browser.url('/');
      browser.click('#create-video');
      assert.include(browser.getText('body'), pageTitle);
    })
  });
});
