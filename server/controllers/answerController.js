const model = require('../models/answerModel.js');

module.exports = {
  getAnswers: (req, res) => {
    console.time();
    const { question_id, page = 1, count = 5 } = req.params;

    model
      .getAnswers(question_id, count)
      .then(result => {
        let data = {
          question: question_id,
          page: page - 1,
          count: count,
          results: result,
        };

        console.timeEnd();
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  addAnswer: (req, res) => {
    console.time();
    const { question_id } = req.params;
    const { body } = req;

    model
      .addAnswer(question_id, body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  markHelpful: (req, res) => {
    const { answer_id } = req.params;

    model
      .markHelpful(answer_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  report: (req, res) => {
    const { answer_id } = req.params;

    model
      .report(answer_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
