import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard', 'Expert'],
        default: 'Easy',
    },
    category: {
        type: String,
        required: true,
    },
    initialCode: {
        type: String,
        required: true,
    },
    validationCode: {
        type: String, // Code to run to validate, or Regex
        required: false, 
    },
    solutionCode: {
        type: String,
        required: true,
    },
    hints: [{
        type: String,
    }],
    xpReward: {
        type: Number,
        default: 50,
    },
    dayNumber: { // For "Daily" rotation
        type: Number,
        unique: true,
    }
}, { timestamps: true });

export default mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);


