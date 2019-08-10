const db = require('../../database/database.js');

module.exports = {
  getQuestions: (product_id, count, offset) => {
    return db.tx(t => {
      return t
        .map(
          'SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2 OFFSET $3',
          [product_id, count, offset],
          question => {
            question.answers = {};
            return t
              .any(
                'SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0',
                [question.question_id]
              )
              .then(answers => {
                for (let answer of answers) {
                  question.answers[answer.id] = answer;
                }
                return question;
              });
          }
        )
        .then(t.batch);
    });

    return db
      .any(
        'SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2 OFFSET $3',
        [product_id, count, offset]
      )

      .then(questions => {
        return Promise.all(
          questions.map(question => {
            question.answers = {};
            return db
              .any(
                'SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0',
                [question.question_id]
              )
              .then(answers => {
                for (let answer of answers) {
                  question.answers[answer.id] = answer;
                }
                return question;
              });
          })
        );
      });
  },
  // getQuestions: (product_id, count, offset) => {
  //   return db
  //     .any(
  //       'SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2 OFFSET $3',
  //       [product_id, count, offset]
  //     )
  //     .then(questions => {
  //       return Promise.all(
  //         questions.map(question => {
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
  //               return question;
  //             });
  //         })
  //       );
  //     });
  // },
  addQuestion: (product_id, { body, name, email }) => {
    return db.any(
      `INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4)`,
      [product_id, body, name, email]
    );
  },
  markHelpful: question_id => {
    return db.none(
      `update questions set question_helpfulness = question_helpfulness + 1 where question_id = $1;`,
      [question_id]
    );
  },
  report: question_id => {
    return db.none(
      `update questions set reported = 1 where question_id = $1;`,
      [question_id]
    );
  },
};
