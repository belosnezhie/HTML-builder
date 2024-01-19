const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    console.log(err);
  } else {
    const filteredDirents = dirents.filter((dirent) => dirent.isFile());
    filteredDirents.forEach((dirent) => {
      fs.stat(path.join(dirent.path, dirent.name), (err, stats) => {
        if (err) {
          console.error(err);
        }
        const extension = path.extname(path.join(dirent.path, dirent.name));
        const name = dirent.name.replace(extension, '');
        const size = (stats.size / 1024).toFixed(3);
        console.log(`${name} - ${extension.replace('.', '')} - ${size}kb`);
      });
    });
  }
});
