import { NestDecoratorService } from './nest_decorator.service';
export declare class NestDecoratorController {
    private readonly nestDecoratorService;
    constructor(nestDecoratorService: NestDecoratorService);
    aaaService: Record<string, any>;
    Hello(): string;
    filter(): void;
    metadata(): string;
    header(accept: string, headers: Record<string, any>): Record<string, any>;
    ip(ip: string): string;
    session(session: any): any;
}
