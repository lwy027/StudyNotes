import { ConfigService } from '@nestjs/config';
export declare class AaaController {
    configService: ConfigService;
    aa(): {
        aaa: any;
        bbb: any;
    };
    bb(): {
        db: any;
    };
}
