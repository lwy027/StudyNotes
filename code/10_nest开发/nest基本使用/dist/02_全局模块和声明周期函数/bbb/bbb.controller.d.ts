import { OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { AaaService } from 'src/02_全局模块和声明周期函数/aaa/aaa.service';
export declare class BbbController implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    private readonly bbbService;
    private readonly aaaService;
    constructor(bbbService: BbbService, aaaService: AaaService);
    onModuleInit(): void;
    onApplicationShutdown(signal?: string): void;
    beforeApplicationShutdown(): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
}
