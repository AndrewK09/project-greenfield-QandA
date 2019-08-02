const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes/routes.js');
app.use('/qa', routes);

// app.get('/qa/:product_id/:page?/:count?', (req, res) => {
//   console.time();
//   let product_id = req.params.product_id;
//   let page = req.params.page || 1;
//   let count = req.params.count || 5;
//   let data = {
//     product_id: product_id,
//     results: [],
//   };

//   db.any(
//     'SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2',
//     [product_id, count]
//   )
//     .then(result => {
//       data.results = result;

//       return Promise.all(
//         data.results.map(question => {
//           question.answers = {};
//           return db
//             .any(
//               'SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0',
//               [question.question_id]
//             )
//             .then(answers => {
//               for (let answer of answers) {
//                 question.answers[answer.id] = answer;
//               }
//             });
//         })
//       );
//     })
//     .then(result => {
//       console.timeEnd();
//       res.send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });

// app.get('/qa/:question_id/answers/:page?/:count?', (req, res) => {
//   console.time();
//   const { question_id, page = 1, count = 5 } = req.params;
//   let data = {
//     question: question_id,
//     page: page - 1,
//     count: count,
//     results: [],
//   };
//   db.any(
//     `SELECT answer_id, body, date, answerer_name, helpfulness, photos
//       FROM answers WHERE question_id = $1 AND report = 0 limit $2`,
//     [question_id, count]
//   )
//     .then(result => {
//       data.results = result;
//       console.timeEnd();
//       res.send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//api requires = tens of ms
//EXPLAIN ANALYZE <QUERY>
