import { AaaService } from './aaa.service';
import { BbbService } from './bbb.service';
export declare class AaaController {
    private readonly aaaService;
    private readonly bbbService;
    constructor(aaaService: AaaService, bbbService: BbbService);
    aaa(): any;
}
