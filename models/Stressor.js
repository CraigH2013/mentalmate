const mongoose = require('mongoose');

const stressorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  category: { type: String, default: 'General' },
  open: { type: Boolean, required: true, default: true },
  rating: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  notes: { type: String, default: '' },
  pattern: {
    type: String,
    enum: [
      'NONE',
      'ALL_OR_NOTHING',
      'ALWAYS_THINKING',
      'NEGATIVE_FOCUS',
      'THINK_W_FEELINGS',
      'GUILT_BEATING',
      'LABELING',
      'FORTUNE_TELLING',
      'MIND_READING',
      'BLAME',
    ],
    default: 'NONE',
  },
});

stressorSchema.virtual('attention').get(function () {
  const { rating } = this;

  let multiplier = null;

  switch (rating) {
    case 'Low':
      multiplier = 0.33;
      break;
    case 'Medium':
      multiplier = 0.66;
      break;
    case 'High':
      multiplier = 1;
      break;
    default:
      break;
  }

  return multiplier;
});

const Stressor = mongoose.model('Stressor', stressorSchema);

module.exports = Stressor;
