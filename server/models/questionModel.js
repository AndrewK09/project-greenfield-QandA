const db = require('../../database/database.js');
module.exports = {
  getQuestions: (product_id, count, offset) => {
    return db
      .query(
        'SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2 OFFSET $3',
        [product_id, count, offset]
      )
      .then(({ rows }) => {
        return Promise.all(
          rows.map(question => {
            question.answers = {};
            return db
              .query(
                'SELECT answer_id as id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0',
                [question.question_id]
              )
              .then(({ rows }) => {
                console.log('rows :', rows);
                for (let answer of rows) {
                  question.answers[answer.id] = answer;
                }
                return question;
              });
          })
        );
      });
  },
  addQuestion: (product_id, { body, name, email }) => {
    return db.query(
      `INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4)`,
      [product_id, body, name, email]
    );
  },
  markHelpful: question_id => {
    return db.query(
      `update questions set question_helpfulness = question_helpfulness + 1 where question_id = $1;`,
      [question_id]
    );
  },
  report: question_id => {
    return db.query(
      `update questions set reported = 1 where question_id = $1;`,
      [question_id]
    );
  },
};
