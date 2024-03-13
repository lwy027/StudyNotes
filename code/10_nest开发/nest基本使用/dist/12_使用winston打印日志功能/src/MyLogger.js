"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const winston_1 = require("winston");
const chalk = require("chalk");
const dayjs = require("dayjs");
class MyLogger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: 'debug',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(({ context, level, message, time }) => {
                const appStr = chalk.green(`[NEST]`);
                const contextStr = chalk.yellow(`${context}`);
                return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            })),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                    filename: '111.log',
                    dirname: 'log',
                }),
            ],
        });
        console.log(this.logger);
    }
    log(message, context) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, time });
    }
    error(message, context) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, time });
    }
    warn(message, context) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, time });
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=MyLogger.js.map