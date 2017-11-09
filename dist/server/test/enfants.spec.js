"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
var app_1 = require("../app");
var enfant_1 = require("../models/enfant");
var should = chai.use(chaiHttp).should();
describe('Enfants', function () {
    beforeEach(function (done) {
        enfant_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('Backend tests for children', function () {
        it('should get all the children', function (done) {
            chai.request(app_1.app)
                .get('/api/enfants')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get enfants count', function (done) {
            chai.request(app_1.app)
                .get('/api/enfants/count')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new enfant', function (done) {
            var enfant = { name: 'Fluffy', weight: 4, age: 2 };
            chai.request(app_1.app)
                .post('/api/enfant')
                .send(enfant)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                res.body.should.have.a.property('weight');
                res.body.should.have.a.property('age');
                done();
            });
        });
        it('should get a enfant by its id', function (done) {
            var enfant = new enfant_1.default({ name: 'Enfant', weight: 2, age: 4 });
            enfant.save(function (error, newEnfant) {
                chai.request(app_1.app)
                    .get("/api/enfant/" + newEnfant.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('weight');
                    res.body.should.have.property('age');
                    res.body.should.have.property('_id').eql(newEnfant.id);
                    done();
                });
            });
        });
        it('should update a enfant by its id', function (done) {
            var enfant = new enfant_1.default({ name: 'Enfant', weight: 2, age: 4 });
            enfant.save(function (error, newEnfant) {
                chai.request(app_1.app)
                    .put("/api/enfant/" + newEnfant.id)
                    .send({ weight: 5 })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a enfant by its id', function (done) {
            var enfant = new enfant_1.default({ name: 'Enfant', weight: 2, age: 4 });
            enfant.save(function (error, newEnfant) {
                chai.request(app_1.app)
                    .delete("/api/enfant/" + newEnfant.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=enfants.spec.js.map