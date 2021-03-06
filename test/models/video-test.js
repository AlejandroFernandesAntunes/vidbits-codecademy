const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video');
async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
}

describe('Video attributes', () => {
  it('has a title which is a String', ()=>{
    const titleAsInt = 2;
    const video = new Video({title: titleAsInt});
    assert.strictEqual(video.title, titleAsInt.toString());
  })

  it('has a description which is a String', ()=>{
    const descriptionAsAString = 2;
    const video = new Video({title: 'title', description: descriptionAsAString});
    assert.strictEqual(video.description, descriptionAsAString.toString());
  })

  it('has a url which is a String', ()=>{
    const url = 2;
    const video = new Video({title: 'with url', url: url});
    assert.strictEqual(video.url, url.toString());
  })
})