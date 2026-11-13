import mongoose from 'mongoose';

const HireInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    roleSlug: { type: String, default: '' },
    budget: { type: String, default: '' },
    startDate: { type: String, default: '' },
    message: { type: String, required: true, trim: true },
    sourceUrl: { type: String, default: '' },
    requestedExpertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MentorApplication',
      default: null,
    },
    requestedExpertName: { type: String, default: '' },
    assignedExpertIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MentorApplication',
      },
    ],
    sentAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ['pending', 'sent', 'closed'],
      default: 'pending',
      index: true,
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

if (mongoose.models.HireInquiry) {
  delete mongoose.models.HireInquiry;
}

const HireInquiry = mongoose.models.HireInquiry || mongoose.model('HireInquiry', HireInquirySchema);

export default HireInquiry;
