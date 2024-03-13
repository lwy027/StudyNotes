import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class sessionController {
  @Inject(SessionService)
  sessionService: SessionService;

  @Get('count')
  async count(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    //1.请求获取cookie
    const sid = req.cookies?.sid;

    const session = await this.sessionService.getSession(sid);

    const curCount = session.count ? parseInt(session.count) + 1 : 1;
    const curSid = await this.sessionService.setSession(sid, {
      count: curCount,
    });

    res.cookie('sid', curSid, { maxAge: 1800000 });
    this.sessionService.setSession(sid, session.count);
  }
}
