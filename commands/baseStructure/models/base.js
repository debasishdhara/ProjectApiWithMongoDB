const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
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
},{timestamps: true,versionKey: false});


// Soft delete helper function
baseSchema.methods.softDelete = function() {
  this.deletedAt = Date.now(); // Mark as deleted by setting deletedAt
  return this.save();
};

// Virtuals for excluding soft deleted documents from queries
baseSchema.virtual('isDeleted').get(function() {
  return this.deletedAt !== null;
});

// Static method to find non-deleted users
baseSchema.statics.findNotDeleted = function() {
  return this.find({ deletedAt: null });
};

// Static method to find deleted users
const baseM = mongoose.model('baseM', baseSchema);
module.exports = baseM;
