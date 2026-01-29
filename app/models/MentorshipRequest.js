import mongoose from 'mongoose';

const mentorshipRequestSchema = new mongoose.Schema({
    // Student Info
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Can be a guest lead initially
    },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentPhone: String,

    // Request Details
    topic: { type: String, required: true }, // e.g., "React", "Career", "System Design"
    message: String,
    requestedDate: Date,

    // Status Flow
    status: {
        type: String, // pending -> assigned -> completed | cancelled
        enum: ['pending', 'assigned', 'completed', 'cancelled'],
        default: 'pending'
    },

    // Assignment
    assignedMentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedAt: Date,

    // Session Details (Post-Assignment)
    meetingLink: String,

    adminNotes: String
}, { timestamps: true });

if (mongoose.models.MentorshipRequest) {
    delete mongoose.models.MentorshipRequest;
}

export default mongoose.models.MentorshipRequest || mongoose.model('MentorshipRequest', mentorshipRequestSchema);
