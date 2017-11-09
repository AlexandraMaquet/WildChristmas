import * as mongoose from 'mongoose';

const enfantSchema = new mongoose.Schema({
  name: String,
  town: String,
  age: Number,
  present: String
});

const Enfant = mongoose.model('Enfant', enfantSchema);

export default Enfant;
