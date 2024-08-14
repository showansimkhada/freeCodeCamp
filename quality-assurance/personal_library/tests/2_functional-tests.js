const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../index.js');

chai.use(chaiHttp);
let id;
suite('Functional Tests', function() {

  suite('Routing tests', function() {
    // POST
    test('Test POST /api/books with title', done => {
      chai.request(server)
        .post('/api/books')
        .send({title: 'help'})
        .end(async (err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.title, 'help');
          id = res.body._id;
          assert.equal(res.body._id, id);
        })
        done();
    });
    
    test('Test POST /api/books with no title given', done => {
      chai.request(server)
        .post('/api/books')
        .send({title: ''})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, "missing required field title");
        })
        done();
    });

    test('GET /api/books => array of books',  done => {
      chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body)
      });
      done();
    }); 

    // GET
    test('Test GET /api/books',  done => {
      chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body, "response should be an array");
        })
        done();
    });

    test('Test GET /api/books/[id] with id not in db',  done => {
      chai.request(server)
        .get('/api/books/abc')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, "no book exists");
        })
        done();
    });

    test('Test POST /api/books/[id] with comment', function(done){
      chai.request(server)
        .post('/api/books/' + id)
        .send({comments: "testing posting"})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body._id, id);
        })
        done();
    });

    test('Test POST /api/books/[id] without comment field', function(done){
      chai.request(server)
        .post('/api/books/' + id)
        .send({comments: ""})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, "missing required field comment");
        });
        done();
    });

    test('Test POST /api/books/[id] with comment, id not in db', function(done){
      chai.request(server)
        .post('/api/books/abc')
        .send({comment: "error posting"})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, "no book exists");
        });
        done();
    });

    // DELETE
    test('Test DELETE /api/books/[id] with valid id in db', function(done){
      chai.request(server)
        .delete('/api/books/' + id)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, "delete successful");
        });
        done();
    });

    test('Test DELETE /api/books/[id] with  id not in db', function(done){
      chai.request(server)
        .delete('/api/books/abc')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, "no book exists");
        });
        done();
    });
  });
});