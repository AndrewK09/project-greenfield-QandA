var csv = require('fast-csv');
const path = require('path');
const Pool = require('pg').Pool;
const { PG_CONFIG } = require('../config/config.js');
const pool = new Pool(PG_CONFIG);

// let csvStream = csv
//   .fromPath(path.join(__dirname, '../../Desktop/answers_photos.csv'), {
//     headers: true,
//   })
//   .on('data', function(record) {
//     csvStream.pause();
//     pool.query(
//       `UPDATE answers SET photos = photos || '{${
//         record[' url']
//       }}' WHERE answer_id = $1;`,
//       [record[' answer_id']],
//       (err, result) => {
//         if (err) console.log(err);
//         csvStream.resume();
//       }
//     );
//   })
//   .on('end', function() {
//     console.log('Job is done!');
//   })
//   .on('error', function(err) {
//     console.log(err);
//   });

const fs = require('fs');

// fs.createReadStream(path.join(__dirname, '../csv/test.csv'))
//   .pipe(csv.parse({ headers: true }))
//   .on('data', row => {
//     console.log(row.id);
//     pool.query(
//       `insert into test VALUES ('{${row.url}}', $1)`,
//       [row.answer_id],
//       (err, result) => {
//         if (err) console.log(err);
//       }
//     );
//   })
//   .on('end', () => {
//     console.log('Completed seed');
//   })
//   .on('err', err => {
//     console.log(err);
//   });

// fs.createReadStream(path.join(__dirname, '../../Desktop/answers.csv'))
//   .pipe(csv.parse({ headers: true }))
//   .on('data', row => {
//     pool.query(
//       `insert into answers VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//       [
//         row.id,
//         row[' question_id'],
//         row[' body'],
//         row[' date_written'],
//         row[' answerer_name'],
//         row[' answerer_email'],
//         row[' reported'],
//         row[' helpful'],
//       ],
//       (err, result) => {
//         if (err) console.log(err);
//         console.log(result);
//       }
//     );
//   })
//   .on('end', () => {
//     console.log('Completed seed');
//   })
//   .on('err', err => {
//     console.log(err);
//   });

module.exports = pool;
