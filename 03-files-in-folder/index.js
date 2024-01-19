const fs = require('fs');
// const fs = require('node:fs/promises');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    console.log(err);
  } else {
    const filteredDirents = dirents.filter((dirent) => dirent.isFile());
    filteredDirents.forEach((dirent) => {
      fs.stat(`${dirent.path}/${dirent.name}`, (err, stats) => {
        if (err) {
          console.error(err);
        }
        const extension = path.extname(`${dirent.path}/${dirent.name}`);
        const name = dirent.name.replace(extension, '');
        const size = (stats.size / 1024).toFixed(3);
        console.log(`${name} - ${extension.replace('.', '')} - ${size}kb`);
      });
    });
  }
});

// fs.promises.readdir(dirPath, { withFileTypes: true }).then((dirEntr) => {
//   let result = [];
//   for (let dir of dirEntr) {
//     if (dir.isFile()) {
//       // const dirName = dir.name.split('.')[0];
//       // const dirExt = dir.name.split('.')[1];
//       // const infoArr = [];
//       // infoArr.push(dirName);
//       // infoArr.push(dirExt);
//       // infoArr.push(dir.path);
//       result.push(fs.promises.stat(dir.path));
//     }
//   }
//   return result;
// }).then((promises) => {
//   Promise.all(promises).then((val) => console.log(val));
// });

// fs.promises.readdir(dirPath, { withFileTypes: true }).then((directoryEntry) => {
//   return fs.promises.stat(directoryEntry[0].path);
// }).then((test) => {
//   result.push([test.size / 1024]);
// })

// Promise.all(result).then((va) => console.log(va));

// result.forEach((fileInfo) => {
//   fs.promises.stat(fileInfo[2]).then((stat) => {
//     console.log(stat.size);
//   });
// });
// fs.promises.readdir(dirPath, { withFileTypes: true }).then((directoryEntries) => {
//   for (let entry of directoryEntries) {
//     result.push(fs.promises.stat(entry.path));
//   }
//   return result;
// }).then((statPromisses) => {
//   statPromisses.forEach((item) => {
//     item.then((some) => {
//       console.log(some.size / 1024);
//     })
//   })
// })
