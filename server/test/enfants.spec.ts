import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Enfant from '../models/enfant';

const should = chai.use(chaiHttp).should();

describe('Enfants', () => {

  beforeEach(done => {
    Enfant.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for enfants', () => {

    it('should get all the enfants', done => {
      chai.request(app)
        .get('/api/enfants')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get enfants count', done => {
      chai.request(app)
        .get('/api/enfants/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new enfant', done => {
      const enfant = { name: 'Alex', age: 40, town: 'Chartres', present: 'nerf' };
      chai.request(app)
        .post('/api/enfant')
        .send(enfant)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('age');
          res.body.should.have.a.property('town');
          res.body.should.have.a.property('present');
          done();
        });
    });

    it('should get a enfant by its id', done => {
      const enfant = new Enfant({ name: 'Alex', age: 40, town: 'Chartres', present: 'nerf'});
      enfant.save((error, newEnfant) => {
        chai.request(app)
          .get(`/api/enfant/${newEnfant.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.a.property('name');
            res.body.should.have.a.property('age');
            res.body.should.have.a.property('town');
            res.body.should.have.a.property('present');
            res.body.should.have.property('_id').eql(newEnfant.id);
            done();
          });
      });
    });

    it('should update a enfant by its id', done => {
      const enfant = new Enfant({ name: 'Name', age: 40, town: 'town', present: 'present' });
      enfant.save((error, newEnfant) => {
        chai.request(app)
          .put(`/api/enfant/${newEnfant.id}`)
          .send({ town: 50 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a enfant by its id', done => {
      const enfant = new Enfant({ name: 'Name', age: 40, town: 'town', present: 'present' });
      enfant.save((error, newEnfant) => {
        chai.request(app)
          .delete(`/api/enfant/${newEnfant.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


