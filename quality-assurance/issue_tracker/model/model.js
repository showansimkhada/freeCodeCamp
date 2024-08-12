const mongoose = require('mongoose');
const { Schema } = mongoose;

const IssueSchema = new Schema({
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        default: ""
    },
    status_text: {
        type: String,
        default: ""
    },
    open: {
        type: Boolean,
        default: true
    },
    created_on: String,
    updated_on: String
});
const Issue = mongoose.model("Issue", IssueSchema);

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    issues: [IssueSchema]
})
const Project = mongoose.model("Project", ProjectSchema);

exports.Issue = Issue;
exports.Project = Project;