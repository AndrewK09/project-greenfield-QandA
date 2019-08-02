const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const pool = require('./database.js');

app.get('/qa/:product_id', (req, res) => {
  let product_id = req.params.product_id;
  // console.log(product_id);
  let data = {
    product_id: product_id,
    results: [],
  };
  pool.query(
    `SELECT question_id, 
      question_body,
      question_date, 
      asker_name,
      asker_email,
      question_helpfulness
      FROM questions WHERE  product_id = $1 AND reported = 0 
      limit 50`,
    [product_id],
    (err, result) => {
      if (err) throw err;

      data.results.push(result.rows);

      res.send(result.rows);
    }
  );
});

app.get('/answers', (req, res) => {
  pool.query('select * from answers where answer_id < 27', (err, result) => {
    res.send(result.rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
