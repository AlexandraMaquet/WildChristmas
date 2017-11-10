import Enfant from '../models/enfant';
import BaseCtrl from './base';

export default class EnfantCtrl extends BaseCtrl {
  model = Enfant;

  getAllCreated = (req, res) => {
    this.model.find({created:true}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  countCreated = (req, res) => {
    this.model.count({created:true}, (err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }

  test = (req, res) => {
    this.model.count({created:true}, (err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }
}
