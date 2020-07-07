const fs = require("fs");
const { getJobData } = require("../services/jobData");
const { writeJsonToFile } = require("../utils");

module.exports = async (app) => {
  // Route crawling by ID
  app.get("/job/:ids", async function (req, res) {
    const { out } = req.query;
    let ids = req.params.ids;

    // Check if ids exist
    if (!ids) {
      res.send({});
      return;
    }
    ids = ids.split("-");

    const response = await getJobData({ ids });

    // Check if need to write to file
    out && out.toLowerCase() === "true" && writeJsonToFile(response);

    res.send(response);
    return;
  });

  // Route crawling by lists
  app.get("/job/l/:ids", async function (req, res) {
    const { out } = req.query;
    let ids = req.params.ids;

    // Check if ids exist
    if (!ids) {
      res.send({});
      return;
    }
    ids = ids.split("-");

    const response = await getJobData({ ids, isById: false });

    // Check if need to write to file
    out && out.toLowerCase() === "true" && writeJsonToFile(response);

    res.send(response);
    return;
  });
};
