'use strict'
const USER = require('../model/model.js').USER;

// Create new user or display the user if it exists
module.exports = app => {
    app.route('/api/users')
    .post(async (req, res) => {
        let user = req.body.username;
        if(!user) {
            res.json("Path `username` is required");
        }
        try {
            let findOne = await USER.findOne({username: user});
            if (findOne) {
                res.json({
                    username: findOne.username
                })
            } else {
                findOne = new USER({
                    username: user
                })
                await findOne.save();
                res.json({
                    _id: findOne._id,
                    username: findOne.username
                })
            }
        } catch (err) {
            console.log(err);
            res.json('Server error..');
        }
    })
        
    .get(async (req, res) => {
        const users = await USER.find({})
        let output = [];
        users.map((user) => {
            output.push({ 
                _id: user._id,
                username: user.username
            });
        })
        res.send(output)
    });
    
    // Add exercise to the existing user
    app.route('/api/users/:_id/exercises')
    .post(async (req, res) => {
        let id = req.params._id;
        let des = req.body.description;
        let dur = req.body.duration;
        let d = req.body.date;
        if (d) {
            d = new Date(d);
        } else {
            d = new Date(Date.now());
        }
        try {
            // check if its already in the database
            let findOne = await USER.findOne({
                _id: id
            })
            if (findOne) {
                let nE = {
                    description: des,
                    duration: dur,
                    date: d
                };
                findOne.log.push(nE);
                await findOne.save();
                res.json({
                    _id: findOne._id,
                    username: findOne.username,
                    date: nE.date.toDateString(),
                    duration: nE.duration,
                    description: nE.description
                })
            } else {
                res.json({});
            }
        } catch (err) {
            console.error(err)
            res.json('Server error...')
        }
    });
      
    // Return all added exercises
   app.route('/api/users/:_id/logs?')
   .get(async (req, res) => {
        let id = req.params._id;
        let frm = req.query.from;
        let to = req.query.to;
        let limit = req.query.limit;
    
        if (frm === undefined) {
            frm = new Date(0);
            }
            if (to === undefined) {
            to = new Date();
            }
            if (limit === undefined) {
            limit = 0;
            } else {
            limit = parseInt(limit);
        }
        let findOne = await USER.findById(id);
        if (findOne) {
            res.json({
                _id: findOne._id,
                username: findOne.username,
                count: findOne.log.length,
                log: findOne.log
            })
        } else {
            res.json({
                error: "Not found"
            })
        }
    });
}