const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  jobInfo: String,
  location: String,
  jobDes: String,
  jobRequirements: String
}, {
  timestamps: true
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company
