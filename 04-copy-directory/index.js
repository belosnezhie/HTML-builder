const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const newPath = path.join(__dirname, 'files-copy');

fs.rm(newPath, { recursive: true }, () => {
  fs.mkdir(newPath, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    fs.readdir(dirPath, { withFileTypes: true }, (err, dirents) => {
      if (err) {
        console.log(err);
      } else {
        dirents.forEach((file) => {
          fs.copyFile(
            path.join(file.path, file.name), // from
            path.join(newPath, file.name), // to
            (err) => {
              if (err) {
                console.error(err);
              }
            },
          );
        });
      }
    });
  });
});

// fs.mkdir(newPath, { recursive: true }, (err) => {
//   if (err) {
//     return console.error(err);
//   }
//   fs.readdir(dirPath, { withFileTypes: true }, (err, dirents) => {
//     if (err) {
//       console.log(err);
//     } else {
//       dirents.forEach((file) => {
//         fs.copyFile(
//           path.join(file.path, file.name), // from
//           path.join(newPath, file.name), // to
//           (err) => {
//             if (err) {
//               console.error(err);
//             }
//           },
//         );
//       });
//     }
//   });
// });
