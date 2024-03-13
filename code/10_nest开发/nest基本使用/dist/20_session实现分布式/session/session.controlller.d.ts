import { Request, Response } from 'express';
import { SessionService } from './session.service';
export declare class sessionController {
    sessionService: SessionService;
    count(req: Request, res: Response): Promise<void>;
}
