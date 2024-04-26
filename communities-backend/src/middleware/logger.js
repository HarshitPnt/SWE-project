// logging middleware which logs the request method, request url, and the response status code

import fs from "fs";
//  get the current time and date
const getTime = () => {
  const date = new Date();
  //  convert time to IST timezone
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);
  return date.toISOString();
};

const filename = "./logs/log.log";

// create a write stream
const writeStream = fs.createWriteStream(filename, { flags: "a" });
// log the request method, url, and response status code

const logger = (req, res, next) => {
  writeStream.write(
    `${getTime()} - Method: ${req.method}, URL: ${req.url}, Status Code: ${
      res.statusCode
    }\n`
  );
  next();
};
export default logger;
