var csv = require('fast-csv');
const path = require('path');
const pool = require('./server/database.js');
const fs = require('fs');

var photoCount = 0;
fs.createReadStream(path.join(__dirname, '../Desktop/answers_photos.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('data', row => {
    let photo = JSON.stringify({ id: row.id, url: row[' url'] });
    pool.query(
      `UPDATE answers SET photos = photos || $2::jsonb WHERE answer_id = $1;`,
      [row[' answer_id'], photo],
      (err, result) => {
        if (err) console.log(err);
        photoCount++;
        console.log(photoCount);
      }
    );
  })
  .on('end', () => {
    console.log('Completed adding photos');
  })
  .on('err', err => {
    console.log(err);
  });
