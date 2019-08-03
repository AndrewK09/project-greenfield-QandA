var csv = require('fast-csv');
const path = require('path');
const db = require('./database/database.js');
const fs = require('fs');

let totalCount = 0;

let options = { highWaterMark: 256 * 1024 };
fs.createReadStream(path.join(__dirname, './csv/answers_photos.csv'), options)
  .pipe(csv.parse({ headers: true }))
  .on('data', row => {
    let photo = JSON.stringify({ id: row.id, url: row[' url'] });
    db.any(
      `UPDATE answers SET photos = photos || $2::jsonb   WHERE answer_id = $1;`,
      [row[' answer_id'], photo]
    )
      .then(() => {
        totalCount++;
        if (totalCount % 100000 === 0) {
          console.log(totalCount);
        }
      })
      .catch(error => {
        console.log(error);
      });
  })
  .on('end', () => {
    console.log('Completed adding photos');
  })
  .on('err', err => {
    console.log(err);
  });
