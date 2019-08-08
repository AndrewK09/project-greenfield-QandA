const frisby = require('frisby');
const db = require('../database/database.js');

it('GET should return a status of 200 OK for questions', function() {
  return frisby.get('http://localhost:3000/qa/1').expect('status', 200);
});

it('GET should return a status of 200 OK for answers', function() {
  return frisby.get('http://localhost:3000/qa/1/answers').expect('status', 200);
});

// describe('Questions report endpoint', () => {
//   it('should return a status of 200 OK for questions', function() {
//     return frisby
//       .put('http://localhost:3000/qa/question/99/report')
//       .expect('status', 204);
//   });
// });

// describe('Post question', () => {
//   let count;
//   it('should fetch questions', function() {
//     return frisby.get('http://localhost:3000/qa/50/1/50').then(result => {
//       count = JSON.parse(result.body).results.length;
//     });
//   });
//   it('should return a status of 201 and add question to database', function() {
//     return frisby
//       .fetch('http://localhost:3000/qa/50', {
//         method: 'POST',
//         body: JSON.stringify({
//           body: 'hello world',
//           name: 'hello',
//           email: 'hellol.email.com',
//         }),
//       })
//       .expect('status', 201)
//       .then(() => {
//         return frisby
//           .get('http://localhost:3000/qa/50/1/50')
//           .expect('json', 'results.length', count + 1);
//       });
//   });
// });

// describe('Put report', () => {
//   db.one('SELECT COUNT(*) FROM questions').then(result => {
//     let question_id = result.count;
//     let count;
//     it('should fetch questions', function() {
//       return frisby.get('http://localhost:3000/qa/50/1/50').then(result => {
//         count = JSON.parse(result.body).results.length;
//       });
//     });
//     it('should return a status of 204 and increase reported by 1', () => {
//       return frisby
//         .put(`http://localhost:3000/qa/question/${question_id}/report`)
//         .then(() => {
//           return frisby
//             .get('http://localhost:3000/qa/50/1/50')
//             .expect('json', 'results.length', count - 1);
//         });
//     });
//   });
// });
