'use strict';
const Thread = require('../lib/model').Thread;
const Board = require('../lib/model').Board;
const Reply = require('../lib/model.js').Reply;

module.exports = function (app) {
    app.route('/api/threads/:board')
    // You can send a POST request to /api/threads/{board} with form data 
    // including text and delete_password. The saved database record will 
    // have at least the fields _id, text, created_on(date & time), bumped_on(date & time, 
    // starts same as created_on), reported (boolean), delete_password, & replies (array).
    .post(async (req, res) => {
        let board = req.body.board;
        if (!board) {
            board = req.param.board;
        }
        let text = req.body.text;
        const del_pass = req.body.delete_password;
        var nT = new Thread({
            text: text,
            delete_password: del_pass
        })
        const fB = await Board.findOne({name: board});
        if (!fB) {
            var nB = new Board({
                name: board,
                threads: []
            })
            nB.threads.push(nT);
            nB.bumped_on = nB.created_on;
            const saved = await nB.save();
            if (!saved) {
                res.json("thread post: cannot be saved");
            } else {
                res.redirect('/b/' + board + '/');
            }
        } else {
            fB.threads.push(nT);
            const saved = await fB.save();
            if (!saved) {
                res.json("thread post: cannot be saved");
            } else {
                res.redirect('/b/' + board + '/');
            }
        }
    })
    // You can send a GET request to /api/threads/{board}. 
    // Returned will be an array of the most recent 10 bumped threads on the 
    // board with only the most recent 3 replies for each. The reported and delete_password 
    // fields will not be sent to the client.
    .get(async (req, res) => {
        var board = req.params.board;
        let fB = await Board.findOne({name: board});
        if (!fB) res.json('Not Found');
        var threads = fB.threads.map((thread) => {
            const {
                _id,
                text,
                created_on,
                bumped_on,
                replies
            } = thread;
            thread.replies.sort((a, b) => {
                return new Date(b.bumped_on) - new Date(a.bumped_on);
            });
            var th = thread.replies.map((reply) => {
                const {
                    _id,
                    text,
                    created_on
                } = reply;
                return {
                    _id,
                    text,
                    created_on
                }
            })
            return {
                _id,
                text,
                created_on,
                bumped_on,
                replies: th.slice(0, 3),
                replycount: thread.replies.length
            }
        });
        threads.sort((a, b) => {
            return new Date(b.bumped_on) - new Date(a.bumped_on);
        })
        const th = threads.slice(0, 10)
        if (!threads) return res.json('Not found')
        res.json(threads);
    })
    // You can send a DELETE request to /api/threads/{board} and pass 
    // along the thread_id & delete_password to delete the thread. 
    // Returned will be the string incorrect password or success.
    .delete(async (req, res) => {
        const board = req.params.board;
        const {thread_id, delete_password} = req.body;
        const fB = await Board.findOne({name: board});
        if (!fB) res.json('Not Found');
        const tTD = fB.threads.id(thread_id);
        if (tTD.delete_password == delete_password) {
            await tTD.deleteOne();
            const saved = await fB.save();
            if (!saved) res.json("Couldn't save data");
            res.send('success');
        } else {
            res.send('incorrect password');
        }
    })
    // You can send a PUT request to /api/threads/{board} and pass along 
    // the thread_id. Returned will be the string reported. The reported value 
    // of the thread_id will be changed to true.
    .put(async (req, res) => {
        const board = req.params.board;
        const thread_id = req.body.thread_id;
        const fB = await Board.findOne({name: board});
        if (!fB) res.json('Not Found');
        var threads = fB.threads.id(thread_id);
        threads.reported = true;
        const saved = await fB.save();
        if (!saved) res.json("Couldn't save data");
        res.send('reported')
    });
  
    app.route('/api/replies/:board')
    // You can send a POST request to /api/replies/{board} with form data including text, 
    // delete_password, & thread_id. This will update the bumped_on date to the comment's date. 
    // In the thread's replies array, an object will be saved with at least the properties _id, 
    // text, created_on, delete_password, & reported.
    .post(async (req, res) => {
        var board = req.params.board;
        var {text, delete_password, thread_id} = req.body;
        var nR = new Reply({
            text: text,
            delete_password: delete_password
        })
        var fR = await Board.findOne({name: board});
        if (!fR) res.json('Not Found');
        var thread = fR.threads.id(thread_id);
        thread.replies.push(nR);
        const saved = await fR.save();
        if (!saved) res.json("Couldn't save the data");
        res.redirect('/b/' + board + '/' + thread_id);
    })
    // You can send a GET request to /api/replies/{board}?thread_id={thread_id}. 
    // Returned will be the entire thread with all its replies, also excluding 
    // the same fields from the client as the previous test.
    .get(async (req, res) => {
        var threads;
        var board = req.params.board;
        var thread_id = req.query.thread_id;
        var fB = await Board.findOne({name: board});
        if (!fB) res.json("couldn't found data");
        var th = fB.threads.map((thread) => {
            const {
                _id,
                text,
                created_on,
                bumped_on,
                replies
            } = thread;
            thread.replies.sort((a, b) => {
                return new Date(b.bumped_on) - new Date(a.bumped_on);
            })
            var rep = thread.replies.map((reply) => {
                const {
                    _id,
                    text,
                    created_on
                } = reply;
                return {
                    _id,
                    text,
                    created_on
                }
            })
            return {
                _id,
                text,
                created_on,
                bumped_on,
                replies: rep
            }
        })
        for (let i = 0; i < th.length; i++){
            if (th[i]._id == thread_id) {
                threads = th[i];
                break;
            }
        }
        if (!threads) res.json('Not Found');
        res.json(threads)
    })
    // You can send a PUT request to /api/replies/{board} and pass along 
    // the thread_id & reply_id. Returned will be the string reported. 
    // The reported value of the reply_id will be changed to true
    .put(async (req, res) => {
        const board = req.params.board;
        const {thread_id, reply_id} = req.body;
        const fB = await Board.findOne({name: board});
        if (!fB) res.json('Not Found');
        var threads = fB.threads.id(thread_id);
        var reply = threads.replies.id(reply_id);
        reply.reported = true;
        const saved = await fB.save();
        if (!saved) res.json("Couldn't save data");
        res.send('reported');
    })
    // You can send a DELETE request to /api/replies/{board} and pass along the thread_id, 
    // reply_id, & delete_password. Returned will be the string incorrect password or success. 
    // On success, the text of the reply_id will be changed to [deleted]
    .delete(async (req, res) => {
        const board = req.params.board;
        const {thread_id, reply_id, delete_password} = req.body;
        const fB = await Board.findOne({name: board});
        if (!fB) res.json('Not Found');
        const threads = fB.threads.id(thread_id);
        const rTD = threads.replies.id(reply_id);
        if (rTD.delete_password == delete_password) {
            rTD.text = '[deleted]';
            const saved = await fB.save();
            if (!saved) res.json("Couldn't save data");
            res.json('success');
        } else {
            res.json('incorrect password');
        }
    });
};