import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class BbbService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    beforeApplicationShutdown(signal?: string): void;
    onApplicationShutdown(): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
    onModuleInit(): void;
    findAll(): string;
    findOne(id: number): string;
}
