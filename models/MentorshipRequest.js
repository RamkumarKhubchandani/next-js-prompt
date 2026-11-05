import mongoose from 'mongoose';

const MentorshipRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      default: 'Flexible',
    },
    description: {
      type: String,
      default: '',
    },
    goal: {
      type: String,
      default: '',
    },
    stack: {
      type: [String],
      default: [],
    },
    otherStack: {
      type: String,
      default: '',
    },
    urgency: {
      type: String,
      default: 'Flexible',
    },
    assignedExpertIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MentorApplication',
      },
    ],
    sentAt: {
      type: Date,
      default: null,
    },
    consentTimestamp: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'contacted', 'matched', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.MentorshipRequest) {
  delete mongoose.models.MentorshipRequest;
}

export default mongoose.models.MentorshipRequest || mongoose.model('MentorshipRequest', MentorshipRequestSchema);
