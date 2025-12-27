import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  source: { type: String, default: 'internal' }, // adzuna | remotive | internal
  sourceId: { type: String }, // provider job id
  dateKey: { type: String }, // YYYY-MM-DD UTC cache bucket
  country: { type: String }, // ISO2 country
  workplace: { type: String, enum: ['remote', 'hybrid', 'onsite', 'unknown'], default: 'unknown' },
  role: { type: String, enum: ['frontend', 'fullstack', 'backend', 'unknown'], default: 'unknown' },
  title: { type: String, required: true },
  company: { type: String, required: true },
  logo: { type: String }, // URL to company logo
  location: { type: String, default: 'Remote' },
  type: { type: String, default: 'Full-time' }, // Full-time, Contract, etc.
  salary: { type: String }, // e.g. "$120k - $150k"
  tags: [{ type: String }], // e.g. ["React", "Node.js"]
  description: { type: String },
  postedAt: { type: Date, default: Date.now },
  applyLink: { type: String },
});

JobSchema.index({ dateKey: 1, country: 1 });
JobSchema.index({ source: 1, sourceId: 1, country: 1 }, { unique: false });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
