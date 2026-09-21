const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // Creating a new thread: POST request to /api/threads/{board}
    test('Post request', (err, done) =>{
        done()
    })

    // Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
    test('', (err, done) => {
        done();
    })

    // Reporting a thread: PUT request to /api/threads/{board}
    test('', (err, done) => {
        done();
    })

    // Creating a new reply: POST request to /api/replies/{board}
    test('', (err, done) => {
        done()
    })

    // Viewing a single thread with all replies: GET request to /api/replies/{board}
    test('', (err, done) => {
        done()
    })

    // Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
    test('', (err, done) => {
        done()
    })

    // Reporting a reply: PUT request to /api/replies/{board}
    test('', (err, done) => {

    })

    // Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
    test('', (err, done) => {

    })

    // Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
    test('', (err, done) => {
        done()
    })
});
after(() => {
    chai.request(server).get('/');
})