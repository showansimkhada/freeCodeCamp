const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../index');

chai.use(chaiHttp);
let deleteID;
let date;
let open;
suite('Functional Tests', function() {
    suite("Post Request", () => {
        test('Create an issue with every field: POST request to /api/issues/apitest', done => {
            chai
                .request(server)
                .post('/api/issues/apitest')
                .set('content-type', 'application/json')
                .send({
                    issue_title: "Issue",
                    issue_text: "Issue Text",
                    created_by: "Showan",
                    assigned_to: "ABCD",
                    status_text: "On progress"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    deleteID = res.body._id;
                    date = res.body.created_on;
                    open = res.body.open;
                    assert.equal(res.body.issue_title, "Issue");
                    assert.equal(res.body.issue_text, "Issue Text");
                    assert.equal(res.body.created_by, "Showan");
                    assert.equal(res.body.assigned_to, "ABCD");
                    assert.equal(res.body.status_text, "On progress");
                    done();
                })
        });
    
        test("Create an issue with only required fields: POST request to /api/issues/apitest", done => {
            chai
                .request(server)
                .post('/api/issues/apitest')
                .set("content-type", 'application/json')
                .send({
                    issue_title: "Issue",
                    issue_text: "Issue Text",
                    created_by: "Showan",
                    assigned_to: "",
                    status_text: ""
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.issue_title, "Issue");
                    assert.equal(res.body.issue_text, "Issue Text");
                    assert.equal(res.body.created_by, "Showan");
                    assert.equal(res.body.assigned_to, "");
                    assert.equal(res.body.status_text, "");
                    done();
                })
        });

        test("Create an issue with missing required fields: POST request to /api/issues/apitest", done => {
            chai
                .request(server)
                .post('/api/issues/apitest')
                .set('content-type', 'application/json')
                .send({
                    issue_text: "",
                    issue_text: "",
                    created_by: "",
                    assigned_to: "",
                    status_text: ""
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'required field(s) missing');
                    done();
                })
        })
    });

    suite("Get Request", () => {
        test("View issues on a project: GET request to /api/issues/apitest-get", done => {
            chai
                .request(server)
                .get('/api/issues/apitest')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.length, 2)
                    done();
                })
        })

        test("View issues on a project with one filter: GET request to /api/issues/apitest-get", done => {
            chai
                .request(server)
                .get('/api/issues/apitest')
                .query({
                    _id: deleteID
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0],{
                        _id: deleteID,
                        created_on: date,
                        open: open,
                        updated_on: date,
                        issue_title : "Issue",
                        issue_text : "Issue Text",
                        created_by : "Showan",
                        assigned_to : "ABCD",
                        status_text : "On progress"
                    });
                    done();
                });
        });

        test("View issues on a project with multiple filters: GET request to /api/issues/apitest-get", done => {
            chai
                .request(server)
                .get('/api/issues/apitest')
                .query({
                    _id: deleteID,
                    open: true,
                    assigned_to: "ABCD"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0],{
                        _id: deleteID,
                        created_on: date,
                        open: open,
                        updated_on: date,
                        issue_title : "Issue",
                        issue_text : "Issue Text",
                        created_by : "Showan",
                        assigned_to : "ABCD",
                        status_text : "On progress"
                    });
                    done();
                })
        })

    })

    suite("PUT Request", () => {
        test("Update one field on an issue: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest')
                .send({
                    _id: deleteID,
                    issue_text: "updating"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, deleteID);
                    done();
                })
        })

        test("Update multiple fields on an issue: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest')
                .send({
                    _id: deleteID,
                    issue_title: "lets get changed",
                    issue_text: "just updated",
                    created_by: "showan"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, deleteID);
                    done();
                });
        });

        test("Update an issue with missing _id: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest')
                .send({
                    _id: ""
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "missing _id");
                    done();
                })
        });

        test("Update an issue with no fields to update: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest')
                .send({
                    _id: "612aba9da3e702518106cd56",
                    issue_text: "",
                    issue_title: "",
                    created_by: "",
                    assigned_to: "",
                    status_text: ""                
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "no update field(s) sent");
                    assert.equal(res.body._id, "612aba9da3e702518106cd56");
                    done();
                })
        })

        test("Update an issue with an invalid _id: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest')
                .send({
                    _id: "612aba9da3e702518106cd59",
                    issue_text: "incorrect _id"             
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not update");
                    assert.equal(res.body._id, "612aba9da3e702518106cd59");
                    done();
                })
        })
    })

    suite("Delete request", () => {
        test("Delete an issue: DELETE request to /api/issues/apitest", done => {
            chai
                .request(server)
                .delete('/api/issues/apitest')
                .send({
                    _id: deleteID           
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully deleted")
                    assert.equal(res.body._id, deleteID);
                    done();
                })
        })

        test("Delete an issue with an invalid _id: DELETE request to /api/issues/apitest", done => {
            chai
                .request(server)
                .delete('/api/issues/apitest')
                .send({
                    _id: "612abb1642444e523a233138"           
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not delete")
                    assert.equal(res.body._id, "612abb1642444e523a233138");
                    done();
                })
        })

        test("Delete an issue with missing _id: DELETE request to /api/issues/apitest", done => {
            chai
                .request(server)
                .delete('/api/issues/apitest')
                .send({
                    _id: ""           
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "missing _id");
                    done();
                })
        })
    })
});
