import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class CatchFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
