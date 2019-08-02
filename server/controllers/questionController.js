const model = require('../models/questionModel.js');

module.exports = {
  getQuestions: (req, res) => {
    console.time();
    const { product_id, page = 1, count = 5 } = req.params;
    let data = {
      product_id: product_id,
      results: [],
    };

    model
      .getQuestions(product_id, count, data)
      .then(() => {
        console.timeEnd();
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  addQuestion: (req, res) => {
    console.time();
    console.log('req.params.product_id', req.params.product_id);
    console.log('req.body', req.body);
    res.sendStatus(201);
  },
};
