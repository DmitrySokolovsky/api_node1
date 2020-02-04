import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { IUserRepo } from '../repo';
import { LoggerService } from '../service';
import * as passport from 'passport';
import { LogStatus } from '../constant';
//
@controller('/api/user', passport.authenticate('jwt', {session: false}))
export class UserController {
    constructor(
        @inject(IUserRepo) private userRepo: IUserRepo,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    @httpGet('/')
    public getAllUsers(request: Request, response: Response): Promise<Response> {

        return new Promise<Response>((resolve, reject) => {
            resolve(this.userRepo.getAllUsers().then(data => response.json(data)).catch((error) => {

                return response.send({error, message: 'ERROR'});
            }));
            reject(this.loggerService.log('Unhandled error', LogStatus.ERROR));
        });
    }

}
