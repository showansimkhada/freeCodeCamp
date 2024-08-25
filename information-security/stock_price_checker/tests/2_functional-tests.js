const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../index.js');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // Viewing one stock: GET request to /api/stock-prices/
    test("View one stock", done => {
        chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: 'GOOG'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, 'GOOG');
                assert.exists(res.body.stockData.price, 'GOOG has prie')
                done();
            })
    })
    // Viewing one stock and liking it: GET request to /api/stock-prices/
    test("View one stock and like set to true", done => {
        chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: "MSFT", like: true})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, 'MSFT');
                assert.exists(res.body.stockData.price, 'MSFT has prie');
                assert.equal(res.body.stockData.likes, 1);
                done();
            })
    })
    // Viewing the same stock and liking it again: GET request to /api/stock-prices/
    test("Viewing the same stock and like set to true", done => {
        chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: 'GOOG', like: true})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, 'GOOG');
                assert.exists(res.body.stockData.price, 'GOOG has prie')
                assert.equal(res.body.stockData.likes, 1);
                done();
            })
    })
    // Viewing two stocks: GET request to /api/stock-prices/
    test("View two stocks", done => {
        chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: ['GOOG', 'MSFT']})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, 'GOOG');
                assert.exists(res.body.stockData[0].price, 'GOOG has price')
                assert.equal(res.body.stockData[0].rel_likes, 0, 'GOOG relative likes should be 0');
                assert.equal(res.body.stockData[1].stock, 'MSFT')
                assert.exists(res.body.stockData[1].price, 'MSFT has price');
                assert.equal(res.body.stockData[1].rel_likes, 0, 'MSFT relative likes should be 0');
                done();
            })
    })
    // Viewing two stocks and liking them: GET request to /api/stock-prices/
    test("View two stocks", done => {
        chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: ['GOOG', 'MSFT'], like: true})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, 'GOOG');
                assert.exists(res.body.stockData[0].price, 'GOOG has price');
                assert.equal(res.body.stockData[0].rel_likes, 0);
                assert.exists(res.body.stockData[1].stock, 'MSFT')
                assert.exists(res.body.stockData[1].price, 'MSFT has price');
                assert.equal(res.body.stockData[1].rel_likes, 0);
                done();
            })
    })
});
after(() => {
    chai.request(server).get('/');
})