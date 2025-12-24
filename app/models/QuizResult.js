import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }, // user's selected answer (legacy name kept)
    correctAnswer: { type: String },
    explanation: { type: String },
    technology: { type: String },
    isCorrect: { type: Boolean, required: true },
});

const quizResultSchema = new mongoose.Schema({
    userId: { type: String },
    username: { type: String, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [answerSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.QuizResult || mongoose.model('QuizResult', quizResultSchema);
