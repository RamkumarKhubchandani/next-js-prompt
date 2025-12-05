import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String }, // Brief description for the list view
    content: { type: String, required: true }, // Main educational content
    code: { type: String }, // Starter code for the day's challenge
    solution: { type: String }, // Solution code
    xp: { type: Number, default: 100 }
});

const courseSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'BookOpen' 
    },
    color: {
        type: String,
        default: 'bg-blue-500'
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    lessons: [lessonSchema],
    isPro: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', courseSchema);



