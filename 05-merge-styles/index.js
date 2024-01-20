const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');
const writableStream = fs.createWriteStream(distPath, 'utf-8');

fs.readdir(stylesPath, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    console.log(err);
  } else {
    const filteredDirents = dirents.filter((dirent) => dirent.isFile());
    filteredDirents.forEach((dirent) => {
      const extension = path.extname(path.join(dirent.path, dirent.name));
      if (extension === '.css') {
        const redableStream = fs.createReadStream(
          path.join(dirent.path, dirent.name),
          'utf-8',
        );
        redableStream.on('readable', () => {
          let chunk;
          while (null !== (chunk = redableStream.read())) {
            writableStream.write(chunk);
          }
          writableStream.write('\n');
        });
      }
    });
  }
});
