const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {

  describe('Routing GET /api/convert', function() {
    
    // #1
    test('Convert 10L (valid input)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });

    // #2
    test('Convert an invalid input such as 32g', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit');
          done();
        });
    });

    // #3
    test('Convert an invalid number such as 3/7.2/4kg', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number');
          done();
        });
    });

    // #4
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit');
          done();
        });
    });

    // #5
    test('Convert with no number such as kg', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
    });

  });

});
