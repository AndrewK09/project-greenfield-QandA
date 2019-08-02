const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const pool = require('./database.js');

app.get('/test', (req, res) => {
  pool.query('select * from test', (err, result) => {
    console.log(result.rows);
    res.send(result.rows);
  });
});

app.get('/qa/:product_id', (req, res) => {
  let product_id = req.params.product_id;
  console.log(product_id);
  pool.query(
    'select * from questions where product_id = $1',
    [product_id],
    (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    }
  );
});

app.get('/answers', (req, res) => {
  pool.query('select * from answers where answer_id < 10', (err, result) => {
    res.send(result.rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
