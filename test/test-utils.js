const {jsdom} = require('jsdom');

const Video = require('../models/video');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'A cool video';
  const description = options.description || 'Of Elvis singin polka';
  const url = options.url || generateRandomUrl();
  return {title, description, url};
};

// Add a sample Video object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const generateRandomUrl = () => {
  return `http://example/${Math.random()}`;
};


module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  parseTextFromHTML,
  generateRandomUrl
};
