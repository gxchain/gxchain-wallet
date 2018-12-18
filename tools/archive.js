require('shelljs/global')

var path = require('path')
var fs = require('fs');
var archiver = require('archiver');
var archiveFilePath = path.join(__dirname, 'mobile-wallet.zip');
var archive = archiver('zip');
var ora = require('ora')

rm('-rf', archiveFilePath)

var spinner = ora('archiving...');
spinner.start()

var output = fs.createWriteStream(archiveFilePath);

output.on('close', function () {
  spinner.stop()
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory('../dist', true, {date: new Date()});

archive.finalize();
