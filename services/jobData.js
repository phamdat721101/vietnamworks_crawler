const request = require("request");
const mongoose = require('mongoose')
const cheerio = require("cheerio");
const Company = require('../models/Company')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crawl', {
  useMongoClient: true
}, (error) => {
  if (error) {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
    process.exit()
  }
})

const getJobData = ({ ids, isById = true, link }) => {  
  url = link ? link : 'https://www.vietnamworks.com/kien-truc-su-phan-mem-software-architect-2-1-1-1-1-1-1-1-1-2-1-1-1-1-1-1-1266840-jd?utm_campaign=1266840&utm_source=specialOffers&utm_medium=specialOffers'
  let promises = new Promise((resolve) => {
    request(url, function (error, _, html) {
      if (!error) {
        // Load html to $ using cheerio
        const $ = cheerio.load(html);
        // console.log("Line 30: ", html)
        // Get all needed movie data
        const response = getMovieDataByList($);
        // Check if error exist
        !!response ? resolve(response) : resolve("Fail to load");
      } else {
        resolve("Fail to load");
      }
    });
  });

  return promises.then((value) => {
    console.log(`Done crawling ${url}...`);
    return value;
  });
};

const getMovieDataByList = ($) => {
  // Check if 404 exist
  if ($(".error_code_404").length || $("#unavailable").length) {
    return false;
  }

  let res = {};
  const jobDetail = $(".job-title");
  const jobInfo = jobDetail.first().text()
  console.log("Line 49: ", jobInfo)
  const location = $(".company-location").children().first().text()
  const jobDes = $(".description").first().text()
  const jobRequirements = $(".requirements").first().text()
  res = {
    jobInfo,
    location,
    jobDes: jobDes,
    jobRequirements
  };
  const newJob = new Company(res).save((err, result) => {
    if(err) throw err;

    if(result){
      console.log("Saving data successfully")
    }
  })
  return res;
};


module.exports = {
  getJobData,
  getMovieDataByList,
};
