import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, default: '' },
  },
  { _id: false }
);

const mentorContentSchema = new mongoose.Schema(
  {
    headline: { type: String, default: '' },
    summary: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    topics: { type: [String], default: [] },
    formats: { type: [String], default: [] },
  },
  { _id: false }
);

const hireContentSchema = new mongoose.Schema(
  {
    headline: { type: String, default: '' },
    summary: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    availability: { type: String, default: '' },
    engagementTypes: { type: [String], default: [] },
  },
  { _id: false }
);

const profileContentSchema = new mongoose.Schema(
  {
    displayName: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    roles: { type: [String], default: [] },
    mentor: { type: mentorContentSchema, default: () => ({}) },
    hire: { type: hireContentSchema, default: () => ({}) },
    skillIds: { type: [String], default: [] },
    locationId: { type: String, default: 'online' },
    locationOther: {
      country: { type: String, default: '' },
      city: { type: String, default: '' },
    },
    timezone: { type: String, default: '' },
    yearsExperience: { type: Number, default: 0 },
    languages: { type: [String], default: ['English'] },
    links: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
    projects: { type: [projectSchema], default: [] },
  },
  { _id: false }
);

const consentsSchema = new mongoose.Schema(
  {
    publicProfile: { type: Date, default: null },
    publicPhoto: { type: Date, default: null },
    realName: { type: Date, default: null },
    terms: { type: Date, default: null },
    mayInterview: { type: Date, default: null },
    receiveLeads: { type: Date, default: null },
  },
  { _id: false }
);

const mentorApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    // Display name (real name, required)
    displayName: {
      type: String,
      required: true,
      trim: true,
      default: 'Developer',
    },
    // Immutable after approval: firstname-lastname (-2 on clash)
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    // Cloudinary photo details
    photoUrl: {
      type: String,
      default: '',
    },
    photoPublicId: {
      type: String,
      default: '',
    },
    // Dual role capabilities
    roles: {
      type: [String],
      enum: ['mentor', 'hire'],
      default: ['mentor'],
    },
    // Staging and Live data blocks
    draft: {
      type: profileContentSchema,
      default: () => ({}),
    },
    published: {
      type: profileContentSchema,
      default: null,
    },
    // Mandatory user consents
    consents: {
      type: consentsSchema,
      default: () => ({}),
    },
    // Lifecycle status
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'hidden'],
      default: 'draft',
      index: true,
    },
    interviewedAt: {
      type: Date,
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    rejectedAt: {
      type: Date,
      default: null,
    },
    hiddenByAdmin: {
      type: Boolean,
      default: false,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },

    // Legacy fields for backwards compatibility with existing records
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    github: { type: String, default: '' },
    skills: { type: [String], default: [] },
    yearsExperience: { type: Number, default: 0 },
    hourlyRate: { type: Number, default: 0 },
    availability: { type: String, default: '' },
    education: { type: String, default: '' },
    bio: { type: String, default: '' },
    mentorHeadline: { type: String, default: '' },
    mentorBio: { type: String, default: '' },
    hireHeadline: { type: String, default: '' },
    hireBio: { type: String, default: '' },
    assignedLeadsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Delete model if already compiled in memory for dev hot reloading
if (mongoose.models.MentorApplication) {
  delete mongoose.models.MentorApplication;
}

const MentorApplication = mongoose.model('MentorApplication', mentorApplicationSchema);

export default MentorApplication;
