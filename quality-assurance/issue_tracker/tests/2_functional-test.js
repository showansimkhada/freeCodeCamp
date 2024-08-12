const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let deleteID;
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
                .get('/api/issues/apitest-get')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.length, 3)
                    done();
                })
        })

        test("View issues on a project with one filter: GET request to /api/issues/apitest-get", done => {
            chai
                .request(server)
                .get('/api/issues/apitest-get')
                .query({
                    _id: "612ab790b5f5484f12c46983"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        _id: "612ab790b5f5484f12c46983",
                        assigned_to: "",
                        created_by: "showan",
                        issue_text: "submit first issue",
                        created_on: "Sun Aug 29 2021 10:24:16 GMT+1200 (New Zealand Standard Time)",
                        issue_title: "first issue",
                        open: true,
                        status_text: "",
                        updated_on: "Sun Aug 29 2021 10:24:16 GMT+1200 (New Zealand Standard Time)"
                    });
                    done();
                });
        });

        test("View issues on a project with multiple filters: GET request to /api/issues/apitest-get", done => {
            chai
                .request(server)
                .get('/api/issues/apitest-get')
                .query({
                    _id: "612ab7b8b5f5484f12c4698b",
                    issue_title: "second issue",
                    created_by: "showan"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body[0], {
                        _id: "612ab7b8b5f5484f12c4698b",
                        assigned_to: "",
                        created_by: "showan",
                        created_on: "Sun Aug 29 2021 10:24:56 GMT+1200 (New Zealand Standard Time)",
                        issue_text: "submit second issue",
                        issue_title: "second issue",
                        open: true,
                        status_text: "",
                        updated_on: "Sun Aug 29 2021 10:24:56 GMT+1200 (New Zealand Standard Time)"
                    });
                    done();
                })
        })

    })

    suite("PUT Request", () => {
        test("Update one field on an issue: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest-put')
                .send({
                    _id: "612aba9da3e702518106cd56",
                    issue_text: "updating"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, "612aba9da3e702518106cd56");
                    done();
                })
        })

        test("Update multiple fields on an issue: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest-put')
                .send({
                    _id: "612aba9da3e702518106cd56",
                    issue_title: "lets get changed",
                    issue_text: "just updated",
                    created_by: "showan"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, "612aba9da3e702518106cd56");
                    done();
                });
        });

        test("Update an issue with missing _id: PUT request to /api/issues/apitest-put", done => {
            chai
                .request(server)
                .put('/api/issues/apitest-put')
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
                .put('/api/issues/apitest-put')
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
                .put('/api/issues/apitest-put')
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
