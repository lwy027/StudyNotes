import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class BbbFilter<MyException> implements ExceptionFilter {
    catch(exception: MyException, host: ArgumentsHost): void;
}
