const fs = require('fs');

const loggingLevels = {
  0: "INFO",
  1: "WARN",
  2: "ERROR"
};

const logger = (logLevel, functionName, message) => {
  try {
    const logEntry = `-------------------------------------\n[${loggingLevels[logLevel]}] ${new Date(Date.now())} ${functionName} : ${message}\n`;
    console.log(logEntry);
    fs.appendFile("logs.txt", logEntry, error => {
      if (error) {
        console.log(`Error while making a new log entry : ${error}`);
      }
    })
  } catch (error) {
    console.log(`An error occured while logging an event. Log Level : [${loggingLevels[logLevel]}]. Event : "${new Date(Date.now())} ${functionName} : ${message}". Error : ${error}`)
  }
};

module.exports = logger;