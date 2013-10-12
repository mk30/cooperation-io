var fs = require('fs');
fs.readdir('.', function (err, files) {
    if (err) return console.error(err);

    var results = [];
    var pending = files.length;

    files.forEach(function (file) {
        fs.stat(file, function (err, stat) {
            results.push({ file: file, time: stat.ctime });

            if (--pending > 0) return;

            results.sort(function (a, b) {
                return a.time < b.time ? 1 : -1;
            });
            results.forEach(function (r) {
                console.log(r.file + ' ' + r.time);
            });
        });
    });
});
