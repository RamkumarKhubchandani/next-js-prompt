import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});

const quizResultSchema = new mongoose.Schema({
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
