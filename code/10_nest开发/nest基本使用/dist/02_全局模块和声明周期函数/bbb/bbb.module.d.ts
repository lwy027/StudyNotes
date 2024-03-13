import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class BbbModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    onModuleInit(): void;
    beforeApplicationShutdown(signal?: string): void;
    onApplicationShutdown(): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
}
