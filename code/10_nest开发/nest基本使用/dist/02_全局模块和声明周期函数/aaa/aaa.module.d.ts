import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
export declare class AaaModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    onModuleDestroy(): void;
    onApplicationShutdown(): void;
    beforeApplicationShutdown(signal?: string): void;
    onModuleInit(): void;
    onApplicationBootstrap(): void;
}
