const db = require('../../database/database.js');

module.exports = {
  getAnswers: (question_id, count) => {
    return db.any(
      `SELECT answer_id, body, date, answerer_name, helpfulness, photos 
        FROM answers WHERE question_id = $1 AND report = 0 limit $2`,
      [question_id, count]
    );
  },
};
