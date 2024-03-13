import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly person;
    private readonly person2;
    private readonly person3;
    private readonly person4;
    private readonly person5;
    constructor(appService: AppService, person: {
        name: string;
        age: number;
    }, person2: {
        name: string;
        desc: string;
    }, person3: {
        name: string;
        desc: string;
    }, person4: {
        name: string;
        desc: string;
    }, person5: {
        name: string;
        desc: string;
    });
    private prisma;
    create(): Promise<{
        id: {
            id: number;
        };
        employee: {
            id: number;
            name: string;
            phone: string;
        };
    }>;
    getHello(): Promise<string>;
}
