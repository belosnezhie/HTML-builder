const fs = require('fs');
const path = require('path');

// Folder project-dist
const distPath = path.join(__dirname, 'project-dist');
// HTML
const pagePath = path.join(__dirname, 'project-dist', 'index.html');
// CSS
const stylesPath = path.join(__dirname, 'styles');
const newStylePath = path.join(__dirname, 'project-dist', 'style.css');
// Assets
const assetsPath = path.join(__dirname, 'assets');
const newAssetsPath = path.join(__dirname, 'project-dist', 'assets');
// Templates
const templPath = path.join(__dirname, 'template.html');
// Components
const compPath = path.join(__dirname, 'components');

function createProgectDist(callback) {
  fs.rm(distPath, { recursive: true }, () => {
    fs.mkdir(distPath, { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
      if (callback !== undefined) {
        callback();
      }
    });
  });
}

function copyDirectory(oldPath, newPath, callback) {
  fs.rm(newPath, { recursive: true }, () => {
    fs.mkdir(newPath, { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
      fs.readdir(oldPath, { withFileTypes: true }, (err, dirents) => {
        if (err) {
          console.log(err);
        } else {
          dirents.forEach((entry) => {
            if (!entry.isFile()) {
              return copyDirectory(
                path.join(entry.path, entry.name),
                path.join(newPath, entry.name),
                callback,
              );
            }
            fs.copyFile(
              path.join(entry.path, entry.name), // from
              path.join(newPath, entry.name), // to
              (err) => {
                if (err) {
                  console.error(err);
                }
                if (callback !== undefined) {
                  callback();
                }
              },
            );
          });
        }
      });
    });
  });
}

function copyAssets(callback) {
  return copyDirectory(assetsPath, newAssetsPath, callback);
}

function copyStyles(callback) {
  fs.readdir(stylesPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.log(err);
    } else {
      const filteredDirents = dirents.filter((dirent) => dirent.isFile());
      const writableStream = fs.createWriteStream(newStylePath, 'utf-8');
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
      if (callback !== undefined) {
        callback();
      }
    }
  });
}

function createHTML(callback) {
  makeStringfromFile(path.join(compPath, 'footer.html'), (footer) => {
    makeStringfromFile(path.join(compPath, 'articles.html'), (articles) => {
      makeStringfromFile(path.join(compPath, 'header.html'), (header) => {
        makeStringfromFile(templPath, (page) => {
          let result = page.replaceAll('{{articles}}', articles);
          result = result.replaceAll('{{header}}', header);
          result = result.replaceAll('{{footer}}', footer);
          const writableStream = fs.createWriteStream(pagePath, 'utf-8');
          writableStream.write(result);
          if (callback !== undefined) {
            callback();
          }
        });
      });
    });
  });
}

function makeStringfromFile(path, callback) {
  const redableStream = fs.createReadStream(path, 'utf-8');
  let result = '';

  redableStream.on('readable', () => {
    let chunk;
    while (null !== (chunk = redableStream.read())) {
      result += chunk;
    }
    callback(result);
  });
}

new Promise(function (resolve) {
  createProgectDist(() => resolve(1));
})
  .then(function () {
    createHTML();
  })
  .then(function () {
    copyStyles();
  })
  .then(function () {
    copyAssets();
  });
