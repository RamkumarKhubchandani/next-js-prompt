import mongoose from 'mongoose';

const JobFetchCacheSchema = new mongoose.Schema(
  {
    // YYYY-MM-DD (UTC)
    dateKey: { type: String, required: true },
    // ISO2 country, e.g. US / IN
    country: { type: String, required: true },
    // Provider used, e.g. 'adzuna' | 'remotive'
    source: { type: String, required: true },
    fetchedAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
    // store last query info for debugging
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

JobFetchCacheSchema.index({ dateKey: 1, country: 1 }, { unique: true });
JobFetchCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.JobFetchCache || mongoose.model('JobFetchCache', JobFetchCacheSchema);


