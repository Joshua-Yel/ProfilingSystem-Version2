import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'priest'], default: 'priest' },
  clericalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClericalRecord' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema, 'Users');

export default User;
