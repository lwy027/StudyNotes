import { NestAopService } from './nest_aop.service';
export declare class NestAopController {
    private readonly nestAopService;
    constructor(nestAopService: NestAopService);
    findAll(): string;
    Hello(): string;
    bbb(): string;
    pipe(num: number): number;
}
