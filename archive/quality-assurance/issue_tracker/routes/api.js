'use strict';

const IssueModel = require('../model/model.js').Issue;
const ProjectModel = require('../model/model.js').Project;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (app) => {
  app.route('/api/issues/:project')
  .get(async (req, res) => {
    let project = req.params.project;
    const data = await ProjectModel.findOne({name: project});
    if(!data) {
      res.json([]);
    } else {
      let array = [];
      data.issues.map((x) => {
        array.push({
          assigned_to: x.assigned_to,
          status_text: x.status_text,
          open: true,
          _id: x._id,
          issue_title: x.issue_title,
          issue_text: x.issue_text,
          created_by: x.created_by,
          created_on: x.created_on,
          updated_on: x.updated_on
        })
      })
      res.json(array);
    }
  })
  
  .post(async (req, res) => {
    let project = req.params.project;
    let {
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    } = req.body;

    // Check for required fields
    if (!issue_title || !issue_text || !created_by) {
      res.json({
        error: "required field(s) missing"
      });
      return;
    }

    // Create Issue
    const newIssue = new IssueModel({
      assigned_to: assigned_to || "",
      status_text: status_text || "",
      open:true,
      issue_title: issue_title || "",
      issue_text: issue_text || "",
      created_by: created_by || "",
      created_on: new Date(),
      updated_on: new Date()
    });

    // Check for the project if it exists before
    const oldData = await ProjectModel.findOne({name: project});
    if (!oldData) {
      const newProject = new ProjectModel({ name: project});
      newProject.issues.push(newIssue);
      // Save to the database
      const saved = await newProject.save();
      if (!saved) {
        res.send("Error in saving data");
      } else {
        res.json(newIssue);
      }
    } else {
      oldData.issues.push(newIssue);
      // Save to the database
      const saved = await oldData.save();
      if (!saved) {
        res.send("Error in saving data");
      } else {
        res.json(newIssue);
      }
    }
  })

  .put(async (req, res) => {
    let project = req.params.project;
    const {
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
      open
    } = req.body;

    if (!_id) {
      res.json({
        error: 'missing _id'
      })
    }

    if (
      !issue_text &&
      !issue_title &&
      !created_by &&
      !assigned_to &&
      !status_text
    ) {
      res.json({error: "no update field(s) sent", _id: _id});
      return;
    }

    // Check for the project if it exists before
    const oldData = await ProjectModel.findOne({name: project});
    if (!oldData) {
      res.json({
        error: 'could not update', 
        _id: _id
      });
    } else {
      const issueArray = oldData.issues.map((x) => x);
      const index = issueArray.findIndex(x => x['_id'] == _id);
      if (index === -1) {
        console.log('not found')
        res.json({
          error: 'could not update', 
          _id: _id
        });
      } else {
        issueArray[index]['issue_title'] = issue_title || issueArray[index]['issue_title'];
        issueArray[index]['issue_text'] = issue_text || issueArray[index]['issue_text'];
        issueArray[index]['status_text'] = status_text || issueArray[index]['status_text'];
        issueArray[index]['created_by'] = created_by || issueArray[index]['created_by'];
        issueArray[index]['assigned_to'] = assigned_to || issueArray[index]['assigned_to'];
        issueArray[index]['updated_on'] = new Date();
        issueArray[index]['open'] = open || issueArray[index]['open'];
        // Save to the database
        var da = [...issueArray];
        oldData.issues = [];
        oldData.issues = da;
        const saved = await oldData.save();
        if (!saved) {
          res.json({
            error: 'could not update', 
            _id: _id
          });
        } else {
          res.json({
            result: "successfully updated",
            _id: _id
          });
        }
      }
    }
  })
    
  .delete(async (req, res) => {
    let project = req.params.project;
    const _id = req.body._id;
    if (!_id) {
      res.json({
        error: "missing _id"
      });
      return;
    }
    const oldData = await ProjectModel.findOne({name: project});
    var array = oldData.issues.map((x) => x);
    var index = array.findIndex(x => x['_id'] == _id);
    if (index === -1) {
      res.json({
        error: 'could not delete',
        _id: _id
      })
    } else {
      var da = [...array.slice(0, index),
        ...array.slice(index+1)]
      oldData.issues = da;
      const saved = await oldData.save();
      if (!saved) {
        res.json({
          error: "cannot saved data",
          _id: _id
        });
      } else {
        res.json({
          result: "successfully deleted",
          _id: _id
        });
      }
    }
  });   
};