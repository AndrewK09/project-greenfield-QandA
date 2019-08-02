var csv = require('fast-csv');
const path = require('path');
const pool = require('./server/database.js');
const fs = require('fs');

let totalCount = 0;

let options = { highWaterMark: 256 * 1024 };
fs.createReadStream(path.join(__dirname, './csv/answers_photos.csv'), options)
  .pipe(csv.parse({ headers: true }))
  .on('data', row => {
    let photo = JSON.stringify({ id: row.id, url: row[' url'] });
    pool.query(
      `UPDATE answers SET photos = photos || $2::jsonb WHERE answer_id = $1;`,
      [row[' answer_id'], photo],
      (err, result) => {
        if (err) console.log(err);
        totalCount++;
        if ((totalCount % 100, 000 === 0)) {
          console.log(totalCount);
        }
      }
    );
  })
  .on('end', () => {
    console.log('Completed adding photos');
  })
  .on('err', err => {
    console.log(err);
  });

// fs.createReadStream(path.join(__dirname, './csv/answers_photos.csv'), options)
//   .pipe(csv.parse({ headers: true }))
//   .on('data', row => {
//     let photo = JSON.stringify({ id: row.id, url: row[' url'] });
//     pool.query(
//       `UPDATE answers SET photos = photos || $2::jsonb WHERE answer_id = $1;`,
//       [row[' answer_id'], photo],
//       (err, result) => {
//         if (err) console.log(err);
//         totalCount++;
//         if ((totalCount % 100, 000 === 0)) {
//           console.log(totalCount);
//         }
//       }
//     );
//   })
//   .on('end', () => {
//     console.log('Completed adding photos');
//   })
//   .on('err', err => {
//     console.log(err);
//   });
