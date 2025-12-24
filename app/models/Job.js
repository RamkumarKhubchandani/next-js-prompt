import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
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

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
