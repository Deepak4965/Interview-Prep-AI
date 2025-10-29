const express = require('express')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth.routes')
const sessionRoutes = require('./routes/session.routes')
const questionRoutes = require('./routes/quesion.routes')
const path = require('path');
const cors = require('cors')
const { authUserMiddleware } = require('./middlewares/userAuthmidddleware')
const { generateInterviewQuestions, generateConceptExplanation } = require('./controllers/ai.Controller')
const app = express()

const _dirname = path.resolve()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))




//Routes
app.use('/api/auth', authRoute)
app.use('/api/sessions', sessionRoutes)
app.use('/api/question', questionRoutes)

app.post('/api/ai/user/generate-question', authUserMiddleware, generateInterviewQuestions)
app.post('/api/ai/user/generate-explanation', authUserMiddleware, generateConceptExplanation)


//Server uploads folder
app.use('/api/upload', express.static(path.join(_dirname, 'uploads')))

app.use(express.static(path.join(_dirname, "/frontend/dist")))

app.get("/", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "imdex.html"))
})

module.exports = app