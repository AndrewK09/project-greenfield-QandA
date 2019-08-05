const model = require('../models/questionModel.js');

module.exports = {
  getQuestions: (req, res) => {
    console.time('getQuestions');
    const { product_id, page = 0, count = 5 } = req.params;

    let offset = page === 0 ? 0 : page * count;

    model
      .getQuestions(product_id, count, offset)
      .then(results => {
        let data = {
          product_id,
          results,
        };
        console.timeEnd('getQuestions');
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  addQuestion: (req, res) => {
    console.time('addQuestion');
    const { product_id } = req.params;
    const { body } = req;

    model
      .addQuestion(product_id, body)
      .then(() => {
        console.timeEnd('addQuestion');
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  markHelpful: (req, res) => {
    const { question_id } = req.params;
    console.time('questionHelpful');
    model
      .markHelpful(question_id)
      .then(() => {
        console.timeEnd('questionHelpful');
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  report: (req, res) => {
    const { question_id } = req.params;
    console.time('questionReport');
    model
      .report(question_id)
      .then(() => {
        console.timeEnd('questionReport');
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
