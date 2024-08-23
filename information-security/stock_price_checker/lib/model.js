const { Schema, model } = require('mongoose');

const StockSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    ip_address: {
        type: Array,
        default: []
    }
})

const Stock = model("Stock", StockSchema)

exports.Stock = Stock;