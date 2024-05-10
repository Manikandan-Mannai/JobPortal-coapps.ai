import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
    createdBy: { type: String },
    title: { type: String, required: true },
    jobType: { type: String, required: true },
    salary: { type: Number, required: true },
    vacancies: { type: Number, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: String, required: true },
    applicants: [{ type: String }]
})

const Jobs = mongoose.model("Jobs", JobsSchema)
export default Jobs