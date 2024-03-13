const winston = require("winston");
require("winston-daily-rotate-file");

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    //文件日志
    // new winston.transports.File({
    //   dirname: "log",
    //   filename: "test.log",
    //   maxsize: 1024,
    // }),

    //根据日期打印日志
    new winston.transports.DailyRotateFile({
      level: "info",
      dirname: "log2",
      filename: "test-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH-mm",
      maxSize: "1k",
    }),
  ],
});

logger.info("信息提示");
logger.error("错误提示");
logger.debug("debug提示");
