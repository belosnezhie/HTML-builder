const fs = require('fs');
const path = require('path');

const dataPath = path.join('./01-read-file', 'text.txt');

const redableStream = fs.createReadStream(dataPath, 'utf-8');

redableStream.on('readable', () => {
  let chunk;
  while (null !== (chunk = redableStream.read())) {
    console.log(chunk);
  }
});
