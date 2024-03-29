const { Schema, model } = require('mongoose');
const validator = require('validator');

const schema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    hideJSON: true
  },
  publicKey: {
    type: String,
    trim: true
  },
  secretSeed: {
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
      delete ret.password;
      return ret;
    }
  }
});

module.exports = model('user', schema);
