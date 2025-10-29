const sessionModel = require('../models/session.model')
const questionModel = require('../models/Question.model')


async function createSession(req, res) {

    const { role, experience, topicsToFocus, description, questions } = req.body

    const userId = req.user.id

    const session = await sessionModel.create({
        user: userId,
        role,
        experience,
        topicsToFocus,
        description,

    })

    const questionDocs = await Promise.all(
        questions.map(async (q) => {
            const question = await questionModel.create({
                session: session._id,
                question: q.question,
                answer: q.answer
            })
            return question._id
        })
    )

    session.questions = questionDocs;
    await session.save()

    res.status(201).json({
        sucess: true,
        session
    })

}



async function getMySession(req, res) {

    const user = req.user.id

    const sessions = await sessionModel.find({ user}).sort({ createdAt: -1 }).populate("questions")

    res.status(200).json(sessions)


}

async function getSessionByID(req, res) {

    try {
        const sessionId = req.params.id
        const session = await sessionModel.findById(sessionId)
            .populate({
                path: "questions",
                options: { sort: { isPinned: -1, createdAt: 1 } }
            })
            .exec()

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            })
        }

        return res.status(200).json({
            success: true,
            session
        })
    } catch (error) {
        console.log("server error", error);
        // It's good practice to send a 500 status on server-side errors
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}


async function deleteSession(req, res) {

    const session = await sessionModel.findById(req.params.id)

    if (!session) {
        return res.status(404).json({
            success: false,
            message: "Session not found"
        })
    }

    if (session.user.toString() !== req.user.id) {
        return res.status(401).json({
            message: "Not authorized to delete this session"
        })
    }

    await questionModel.deleteMany({ session: session._id })

    await sessionModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Session deleted successfully"
    })

}



module.exports = { createSession, getMySession, getSessionByID, deleteSession }


