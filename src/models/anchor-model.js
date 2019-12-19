const { Schema, model } = require('mongoose');
const validator = require('validator');

const schema = new Schema({
  publicKey: {
    type: String,
    trim: true
  },
  secretSeed: {
    type: String,
    trim: true
  },
  assetCode: {
    type: String,
    trim: true
  }
 
},
{
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = model('anchor', schema);
