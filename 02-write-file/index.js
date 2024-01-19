const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const writableStream = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Hellow! Please put smth to the console.\n');

stdin.on('data', (data) => {
  if (data.toString() === 'exit\n') {
    process.exit();
  }
  writableStream.write(data);
});

process.on('exit', () => {
  stdout.write('Bye!\n');
});

process.on('SIGINT', () => {
  stdout.write('\n');
  process.exit();
});
