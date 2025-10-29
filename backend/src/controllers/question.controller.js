const QuestionModel = require('../models/Question.model');
const SessionModel = require('../models/session.model');

async function addQuestionsToSession(req, res) {
    try {
        const { sessionId, questions } = req.body;

        // Validate input
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const session = await SessionModel.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Filter out empty or invalid questions
        const validQuestions = questions.filter(
            (q) =>
                q &&
                typeof q.question === "string" &&
                q.question.trim() !== "" &&
                typeof q.answer === "string" &&
                q.answer.trim() !== ""
        );

        if (validQuestions.length === 0) {
            return res.status(400).json({ message: "No valid questions to add" });
        }

        // Create new questions
        const createdQuestions = await QuestionModel.insertMany(
            validQuestions.map((q) => ({
                session: sessionId,
                question: q.question.trim(),
                answer: q.answer.trim(),
            }))
        );

        // Update session with new question IDs
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        return res.status(201).json({
            message: "Questions added successfully",
            questions: createdQuestions,
        });
    } catch (error) {
        console.error("Error adding questions:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


async function togglePinQuestion(req, res) {

    try {
        const questionId = req.params.id
        const question = await QuestionModel.findById(questionId)

        if (!question) {
            return res.status(404).json({
                success: false, message: "Question not found"
            })
        }
        question.isPinned = !question.isPinned
        await question.save()
        res.status(200).json({
            success: true, question
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function updatedQuestionNote(req, res) {

    try {
        const { note } = req.body
        const questionId = req.params.id
        const question = await QuestionModel.findById(questionId)

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            })
        }

        question.note = note || "";
        await question.save()
        res.status(200).json({
            success: true, question
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }

}


module.exports = { addQuestionsToSession, togglePinQuestion, updatedQuestionNote }