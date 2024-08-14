/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const BookModel = require('../lib/model.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      let bookid = req.body._id;
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const data = await BookModel.find({_id: bookid});
      if (!data) {
        res.json([]);
      } else {
        const books = data.map(x => {
          return ({
            _id: x._id,
            title: x.title,
            commentcount: x.comments.length
          })
        })
        res.json(books);
      }
    })
    
    .post(async (req, res) => {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title) {
        return res.json("missing required field title")
      }
      const newData = new BookModel({title: title});
      const saved = await newData.save();
      if (!saved) {
        res.json('error in saving data');
      } else {
        res.json({
          title: newData.title,
          _id: newData._id
        })
      }
    })
    
    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'
      const del = await BookModel.deleteMany({});
      if(!del) {
        res.json('could not delete');
      } else {
        res.json('complete delete successful');
      }
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const data = await BookModel.findOne({_id: bookid});
      if (!data) {
        res.json("no book exists");
      } else {
        res.json({
          _id: data._id,
          title: data.title,
          comments: data.comments
        })
      }
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        res.json("missing required field comment");
      } else {
        const data = await BookModel.findById({_id: bookid});
        if (!data) {
          res.json("no book exists");
        } else {
          res.json({
            _id: data._id,
            title: data.title,
            comments: data.comments
          })
        }
      }
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const data = await BookModel.findByIdAndDelete(bookid);
      if (!data) {
        res.json("no book exists");
      } else {
        res.json("delete successful");
      }
    });
  
};