import { LoggerService } from '@nestjs/common';
export declare class MyLogger implements LoggerService {
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    log(message: any, ...optionalParams: any[]): void;
}
