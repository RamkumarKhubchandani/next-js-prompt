import mongoose from 'mongoose';

const MentorshipRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        default: 'Flexible'
    },
    description: {
        type: String
    },
    goal: {
        type: String
    },
    stack: {
        type: [String],
        default: []
    },
    otherStack: {
        type: String
    },
    urgency: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'matched', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.models.MentorshipRequest || mongoose.model('MentorshipRequest', MentorshipRequestSchema);
