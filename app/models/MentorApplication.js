import mongoose from 'mongoose';

const mentorApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Application Data
    roles: {
        type: [String],
        enum: ['mentor', 'hire'],
        default: []
    },
    photoUrl: {
        type: String,
        default: null
    },
    phone: String,
    country: String,
    linkedin: String,
    skills: [String],
    yearsExperience: Number,
    hourlyRate: Number,
    education: String,
    bio: String,

    // Status
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNotes: String, // Reason for approval/rejection
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: Date
}, { timestamps: true });

// Force recompilation for dev
if (mongoose.models.MentorApplication) {
    delete mongoose.models.MentorApplication;
}

export default mongoose.models.MentorApplication || mongoose.model('MentorApplication', mentorApplicationSchema);
