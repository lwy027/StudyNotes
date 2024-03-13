import { OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
export declare class AaaController implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    private readonly aaaService;
    constructor(aaaService: AaaService);
    onModuleInit(): void;
    beforeApplicationShutdown(signal?: string): void;
    onApplicationShutdown(): void;
    onApplicationBootstrap(): void;
    onModuleDestroy(): void;
    create(createAaaDto: CreateAaaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAaaDto: UpdateAaaDto): string;
    remove(id: string): string;
}
