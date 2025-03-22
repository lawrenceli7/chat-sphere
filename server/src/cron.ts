import cron from "cron";
import https from "https";

// URL of the server to send periodic GET requests
const URL = "https://chat-sphere-xky9.onrender.com";

// Create a cron job that runs every 14 minutes
const job = new cron.CronJob("*/14 * * * *", function () {
  // Send a GET request to the specified URL
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully"); // Log success if the response status is 200
      } else {
        console.log("GET request failed", res.statusCode); // Log failure with the status code
      }
    })
    .on("error", (error) => {
      console.error("Error while sending request", error); // Log any errors that occur during the request
    });
});

export default job;
