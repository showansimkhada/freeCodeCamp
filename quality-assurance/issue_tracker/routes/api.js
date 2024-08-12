'use strict';

module.exports = (app) => {
  app.route('/api/issues/:project')
  .get(function (req, res){
    let project = req.params.project;
    const {
      _id,
      open,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    } = req.query

    // Filters
    ProjectModel.aggregate([
      { $match: { name: project}},
      { $unwind: "$issues"},
      _id != undefined ? { $match: {"issues._id": ObjectID(_id)}} : { $match: {}},
      open != undefined ? { $match: {"issues.open": open}} : { $match: {}},
      issue_title != undefined ? { $match: {"issues.issue_title": issue_title}} : {$match: {}},
      issue_text != undefined ? {$match: {"issues.issue_text": issue_text}} : {$match: {}},
      created_by != undefined ? {$match: {"issues.created_by": created_by}} : {$match: {}},
      assigned_to != undefined ? {$match: {"issues.assigned_to": assigned_to}} : {$match: {}},
      status_text != undefined ? {$match: {"issues.status_text": status_text}} : {$match: {}}
    ]).exec((err, data) => {
      const issues = data.map(x => x.issues);
      if(!issues) {
        res.json([]);
      } else {
        res.json(issues);
      }
    });
  })
  
  .post(function (req, res){
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
      issue_title: issue_title || "",
      issue_text: issue_text || "",
      created_on: new Date(),
      updated_on: new Date(),
      created_by: created_by || "",
      assigned_to: assigned_to || "",
      open: true,
      status_text: status_text || ""
    });

    // Check for the project if it exists before
    ProjectModel.findOne({name: project}, (err, oldData) => {
      // IF doesn't exists
      if (!oldData) {
        const newProject = new ProjectModel({ name: project});
        newProject.issues.push(newIssue);
        // Save to the database
        newProject.save((e, data) => {
          if (e || !data) {
            res.send("Error in saving data");
          } else {
            res.json(newIssue);
          } 
        })
      } else {
        oldData.issues.push(newIssue);
        // Save to the database
        oldData.save((e, data) => {
          if (e || !data) {
            res.send("Error in saving data");
          } else {
            res.json(newIssue);
          }
        })
      }
    })
  })
  .put(function (req, res){
    let project = req.params.project;
    const {
      _id,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    } = req.body;

    if (!_id) {
      res.json({error: "missing _id"});
      return;
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
    ProjectModel.findOne({name: project}, (err, oldData) => {
      // IF doesn't exists
      if (!oldData || err) {
        res.json({
          error: "could not update",
          _id: _id
        });
      } else {
        const issueData = oldData.issues.id(ObjectID(_id));
        if (!issueData) {
          res.json({
            error: "could not update",
            _id: _id
          });
          return;
        }
        issueData.issue_title = issue_title || issueData.issue_title;
        issueData.issue_text = issue_text || issueData.issue_title;
        issueData.created_by = created_by || issueData.created_by;
        issueData.assigned_to = assigned_to || issueData.assigned_to;
        issueData.updated_on = new Date();
        issueData.open = true;
        // Save to the database
        oldData.save((e, data) => {
          if (e || !data) {
            res.json({
              error: "could not update",
              _id: _id
            });
          } else {
            res.json({
              result: "successfully updated",
              _id: _id
            });
          }
        })
      }
    })
  })
    
  .delete(function (req, res){
    let project = req.params.project;
    const _id = req.body._id;
    if (!_id) {
      res.json({
        error: "missing _id"
      });
      return;
    } 
    console.log(project);
    ProjectModel.findOne({name: project}, (err, oldData) => {
      const issues = oldData.issues.id(_id);
      if (!issues || err) {
        res.json({
          error: "could not delete",
          _id: _id
        });
      } else {
        issues.remove();
        oldData.save((e, data) => {
          if (e || !data) {
            res.json({
              error: "could not delete",
              _id: _id
            });
          } else {
            res.json({
              result: "successfully deleted",
              _id: _id
            });
            return;
          }
        })
      }
    })    
  });   
};