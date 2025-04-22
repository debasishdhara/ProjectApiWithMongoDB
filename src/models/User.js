const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  type: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  status: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 1
  },
  tokenVersion: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
{ timestamps: true,versionKey: false });


// Soft delete helper function
userSchema.methods.softDelete = function() {
  this.deletedAt = Date.now(); // Mark as deleted by setting deletedAt
  return this.save();
};

// Virtuals for excluding soft deleted documents from queries
userSchema.virtual('isDeleted').get(function() {
  return this.deletedAt !== null;
});

// Static method to find non-deleted users
userSchema.statics.findNotDeleted = function() {
  return this.find({ deletedAt: null });
};

// Static method to find deleted users
const User = mongoose.model('User', userSchema);
module.exports = User;
