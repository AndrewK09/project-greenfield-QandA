const db = require('../../database/database.js');

module.exports = {
  getAnswers: (question_id, count) => {
    return db.any(
      `SELECT answer_id, body, date, answerer_name, helpfulness, photos 
        FROM answers WHERE question_id = $1 AND report = 0 limit $2`,
      [question_id, count]
    );
  },
  addAnswer: (question_id, { body, name, email, photos }) => {
    return db
      .one(
        `INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4) RETURNING answer_id`,
        [question_id, body, name, email]
      )
      .then(({ answer_id }) => {
        return Promise.all(
          photos.map(url => {
            //insert the url and return the id
            //insert into answer photos object containing returned id and url
            return db
              .one(
                `INSERT INTO photos (answer_id, url) VALUES ($1, $2) RETURNING id;`,
                [answer_id, url]
              )
              .then(({ id }) => {
                let photo = JSON.stringify({ id, url });
                return db.any(
                  `UPDATE answers SET photos = photos || $1::jsonb WHERE answer_id = $2;`,
                  [photo, answer_id]
                );
              });
          })
        );
      });
  },
};
