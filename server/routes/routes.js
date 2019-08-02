const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
const answerController = require('../controllers/answerController.js');

router.get('/:product_id/:page?/:count?', questionController.getQuestions);
router.post('/:product_id', questionController.addQuestion);

router.get('/:question_id/answers/:page?/:count?', answerController.getAnswers);

module.exports = router;
