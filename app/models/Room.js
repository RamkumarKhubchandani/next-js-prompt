import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'javascript', // or 'react'
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);

