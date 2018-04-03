const mongoose = require('mongoose');

const stressorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  category: { type: String, default: 'General' },
  open: { type: Boolean, required: true, default: true },
  rating: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  thoughts: [
    {
      text: { type: String, required: true },
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
      emotions: [
        {
          text: { type: String, required: true },
        },
      ],
      alternatives: [
        {
          text: { type: String, required: true },
          emotions: [{ text: { type: String, required: true } }],
        },
      ],
    },
  ],
});

stressorSchema.virtual('attention').get(function () {
  // unlabeled thoughts = 5 pts
  // labeled thoughts without alternatives = 10
  // multiple total by user rating
  // ratio out of 100, max = 1
  const { rating, thoughts } = this;

  let score = 0;

  thoughts.forEach(({ pattern, alternatives }) => {
    if (pattern === 'NONE') {
      score += 5;
    } else if (!alternatives.length) {
      score += 10;
    }
  });

  let multiplier = null;

  switch (rating) {
    case 'Low':
      multiplier = 1;
      break;
    case 'Medium':
      multiplier = 2;
      break;
    case 'High':
      multiplier = 3;
      break;
    default:
      break;
  }

  return Math.min(score * multiplier * 0.01, 1);
});

const Stressor = mongoose.model('Stressor', stressorSchema);

module.exports = Stressor;
