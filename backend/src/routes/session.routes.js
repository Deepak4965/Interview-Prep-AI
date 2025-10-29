const express = require('express')
const sessionController = require('../controllers/session.controller')
const authUserMiddleware = require('../middlewares/userAuthmidddleware')

const router = express.Router()

router.post('/user/create', authUserMiddleware.authUserMiddleware, sessionController.createSession)
router.get('/user/my-session', authUserMiddleware.authUserMiddleware, sessionController.getMySession)
router.get('/user/:id', authUserMiddleware.authUserMiddleware, sessionController.getSessionByID)
router.delete('/user/:id', authUserMiddleware.authUserMiddleware, sessionController.deleteSession)





module.exports = router