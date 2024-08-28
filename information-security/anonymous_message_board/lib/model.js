const { Schema, model } = require('mongoose');
const date = Date();

const ReplyModel = new Schema({
    text: {
        type: String
    },
    created_on: {
        type: Date,
        default: date
    },
    delete_password: {
        type: String
    },
    reported: {
        type: Boolean,
        default: false
    }
})

const Reply = model('Reply', ReplyModel);

const ThreadModel = new Schema({
    text: {
        type: String
    },
    created_on: {
        type: Date,
        default: date
    },
    bumped_on: {
        type: Date,
        default: date
    },
    reported: {
        type: Boolean,
        default: false
    },
    deleate_password: {
        type: String
    },
    replies: [ReplyModel]
})

const Thread = model('Thread', ThreadModel);

const BoardModel = new Schema({
    name: {
        type: String,
        required: true
    },
    threads: [ThreadModel]
})

const Board = model('Board', BoardModel);

exports.Board = Board;
exports.Reply = Reply;
exports.Thread = Thread;