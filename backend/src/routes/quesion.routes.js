const express = require('express')
const QuestionController = require('../controllers/question.controller')
const authUserMiddleware = require('../middlewares/userAuthmidddleware')

const router = express.Router()

router.post('/user/add', authUserMiddleware.authUserMiddleware, QuestionController.addQuestionsToSession)
router.post('/user/:id/pin', authUserMiddleware.authUserMiddleware, QuestionController.togglePinQuestion)
router.post('/user/:id/note', authUserMiddleware.authUserMiddleware, QuestionController.updatedQuestionNote)


module.exports = router