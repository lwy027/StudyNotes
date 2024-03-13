import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
export declare class AaaService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    create(createAaaDto: CreateAaaDto): string;
    onApplicationShutdown(signal?: string): void;
    beforeApplicationShutdown(): void;
    onModuleDestroy(): void;
    onModuleInit(): void;
    onApplicationBootstrap(): void;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAaaDto: UpdateAaaDto): string;
    remove(id: number): string;
}
