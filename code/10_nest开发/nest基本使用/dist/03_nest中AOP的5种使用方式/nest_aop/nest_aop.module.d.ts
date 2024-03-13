import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class NestAopModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
