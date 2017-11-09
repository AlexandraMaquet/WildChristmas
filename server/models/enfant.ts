import * as mongoose from 'mongoose';

const enfantSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number
});

const Enfant = mongoose.model('Enfant', enfantSchema);

export default Enfant;
