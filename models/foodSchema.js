import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
  amount: { type: 'number' },
  possibleUnits: {
    piece: { type: 'number' },
    slice: { type: 'number' },
    fruit: { type: 'number' },
    g: { type: 'number' },
    oz: { type: 'number' },
    cup: { type: 'number' },
    serving: { type: 'number' },
  },
  category: { type: 'string', trim: true },
  image: { type: 'string', trim: true },
});

const food = mongoose.model('Food', foodSchema);

export default food;
