import mongoose from 'mongoose';

const OneToOneCallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        countryCode: String,
        number: String
    },
    preferredTime: {
        type: String
    },
    timezone: {
        type: String
    },
    notes: {
        type: String
    },
    courseId: {
        type: String
    },
    courseTitle: {
        type: String
    },
    day: {
        type: Number
    },
    lessonTitle: {
        type: String
    },
    sourceUrl: {
        type: String
    },
    profile: {
        id: String,
        username: String,
        plan: String,
        role: String
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.models.OneToOneCall || mongoose.model('OneToOneCall', OneToOneCallSchema);
