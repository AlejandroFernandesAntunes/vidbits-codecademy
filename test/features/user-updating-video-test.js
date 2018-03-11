const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the edit page', () => {
  describe('edits a video', () => {
    it('and is saved', () => {
      const videoToCreate = buildVideoObject();
      browser.url('/create');
      browser.setValue('#title-input', videoToCreate.title);
      browser.setValue('#description-input', videoToCreate.description);
      browser.setValue('#url-input', videoToCreate.url);
      browser.click('#submit-video');
      assert.include(browser.getText('body'), videoToCreate.title);

      browser.click('#edit-video');

      browser.setValue('#title-input', 'edited Title');
      browser.setValue('#description-input', 'edited Description');
      browser.setValue('#url-input', 'editedurl.com');
      browser.click('#edit-video');

      assert.include(browser.getText('body'), 'edited Title');
    });

    it('does not create an aditional video', () => {
      const videoToCreate = buildVideoObject();
      browser.url('/create');
      browser.setValue('#title-input', videoToCreate.title);
      browser.setValue('#description-input', videoToCreate.description);
      browser.setValue('#url-input', videoToCreate.url);
      browser.click('#submit-video');
      assert.include(browser.getText('body'), videoToCreate.title);

      browser.click('#edit-video');

      browser.setValue('#title-input', 'edited Title');
      browser.setValue('#description-input', 'edited Description');
      browser.setValue('#url-input', 'editedurl.com');
      browser.click('#edit-video');

      // It does not render old video
      assert.notInclude(browser.getText('body'), videoToCreate.title);
      assert.include(browser.getText('body'), 'edited Title');
    });
  });
});
