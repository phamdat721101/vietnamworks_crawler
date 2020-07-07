const express = require("express");
const { Command } = require("commander");

const { initCLI, processCLI } = require("./services/cli");

// Init needed app
const app = express();
const program = new Command();

// Routes for job
const jobRoutes = require("./routes/job");
jobRoutes(app);

// Septup CLI
initCLI(program);
const isProcressed = processCLI(program);

// Start the server if user does not choose to crawl by CLI
if (!isProcressed) {
  const PORT = 8000;
  app.listen(PORT, () => console.log(`Crawling on port ${PORT}....`));
}
