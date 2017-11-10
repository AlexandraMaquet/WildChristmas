import * as express from 'express';

import CatCtrl from './controllers/cat';
import EnfantCtrl from './controllers/enfant';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import Enfant from './models/enfant';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const enfantCtrl = new EnfantCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // enfant
  router.route('/enfants').get(enfantCtrl.getAll);
  router.route('/enfants/created').get(enfantCtrl.getAllCreated);
  router.route('/enfants/created/count').get(enfantCtrl.countCreated);
  router.route('/enfants/count').get(enfantCtrl.count);
  router.route('/enfant').post(enfantCtrl.insert);
  router.route('/enfant/:id').get(enfantCtrl.get);
  router.route('/enfant/:id').put(enfantCtrl.update);
  router.route('/enfant/:id').delete(enfantCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
