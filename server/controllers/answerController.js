const model = require('../models/answerModel.js');

module.exports = {
  getAnswers: (req, res) => {
    console.time('getAnswers');
    const { question_id, page = 0, count = 5 } = req.params;

    model
      .getAnswers(question_id, count, page)
      .then(result => {
        let data = {
          question: question_id,
          page: page,
          count: count,
          results: result,
        };

        console.timeEnd('getAnswers');
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  addAnswer: (req, res) => {
    console.time('addAnswer');
    const { question_id } = req.params;
    const { body } = req;

    model
      .addAnswer(question_id, body)
      .then(() => {
        console.timeEnd('addAnswer');
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  markHelpful: (req, res) => {
    const { answer_id } = req.params;
    console.time('markHelpful');
    model
      .markHelpful(answer_id)
      .then(() => {
        console.timeEnd('markHelpful');
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  report: (req, res) => {
    const { answer_id } = req.params;
    console.time('report');

    model
      .report(answer_id)
      .then(() => {
        console.timeEnd('report');
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
