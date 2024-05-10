import mongoose from "mongoose";

const CompanyModel = new mongoose.Schema({
    createdBy: { type: String },
    companyWebsite: { type: String },
    employeeSize: { type: Number },
    companyType: { type: String },
    companyLocation: { type: String },
    companyFounded: { type: String },
    companyDescription: { type: String }
})

const Company = mongoose.model("company", CompanyModel)

export default Company;