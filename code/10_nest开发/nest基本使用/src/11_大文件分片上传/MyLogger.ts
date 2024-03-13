import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  error(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
  // debug?(message: any, ...optionalParams: any[]) {
  //   throw new Error('Method not implemented.');
  // }
  // verbose?(message: any, ...optionalParams: any[]) {
  //   throw new Error('Method not implemented.');
  // }
  // fatal?(message: any, ...optionalParams: any[]) {
  //   throw new Error('Method not implemented.');
  // }
  // setLogLevels?(levels: LogLevel[]) {
  //   throw new Error('Method not implemented.');
  // }
  log(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
}
