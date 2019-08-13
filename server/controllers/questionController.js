const model = require('../models/questionModel.js');
const client = require('../redis-client');
module.exports = {
  getQuestions: async (req, res) => {
    let url = req.headers.host + '/' + req.url;
    let cache = await client.getAsync(url);
    if (cache) {
      let result = await client.getAsync(url);
      res.send(JSON.parse(result));
    } else {
      const { product_id, page = 1, count = 5 } = req.params;
      let offset = parseInt(page) === 1 ? 0 : page * count;
      model
        .getQuestions(product_id, count, offset)
        .then(results => {
          let data = {
            product_id,
            results,
          };
          return client.setAsync(url, JSON.stringify(data)).then(result => {
            res.send(data);
          });
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  },
  addQuestion: (req, res) => {
    const { product_id } = req.params;
    const { body } = req;

    model
      .addQuestion(product_id, body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  markHelpful: (req, res) => {
    const { question_id } = req.params;
    model
      .markHelpful(question_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  report: (req, res) => {
    const { question_id } = req.params;
    model
      .report(question_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
