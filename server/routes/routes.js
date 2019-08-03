const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
const answerController = require('../controllers/answerController.js');

router.get('/:product_id/:page?/:count?', questionController.getQuestions);
router.post('/:product_id', questionController.addQuestion);
router.put('/question/:question_id/helpful', questionController.markHelpful);
router.put('/question/:question_id/report', questionController.report);

router.get('/:question_id/answers/:page?/:count?', answerController.getAnswers);
router.post('/:question_id/answers', answerController.addAnswer);
router.put('/answer/:answer_id/helpful', answerController.markHelpful);
router.put('/answer/:answer_id/report', answerController.report);

module.exports = router;
