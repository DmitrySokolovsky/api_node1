import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { IUserRepo } from '../repo';
import { LoggerService } from '../service';
import { UserModel } from '../models';
import { LogStatus, AuthStatus } from '../constant';
import * as jwt from 'jsonwebtoken';
import { resolve } from 'bluebird';

@controller('/api/auth')
export class LoginController {
    constructor(
        @inject(IUserRepo) private userRepo: IUserRepo,
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    @httpPost('/login')
    public logIn(request: Request, response: Response): Promise<Response> {
        const oParams: UserModel = {
            login: request.body.login,
            password: request.body.password
        };

        return new Promise((resolve, reject) => {
            resolve(this.userRepo.logIn(oParams).then(data => response.json({data, token: jwt.sign(oParams.login, 'feed')})));
            reject(this.loggerService.log('Unhandled error from LoginController', LogStatus.ERROR));
        });
    }

    @httpGet('/')
    public test(request: Request, response: Response): Promise<Response> {

        return new Promise((resolve, reject) => {
            resolve(response.send({ message: 'WORK' }));
            reject(this.loggerService.log('Unhandled error', LogStatus.ERROR));
        });
    }

    @httpPost('/signup')
    public signUp(request: Request, response: Response): Promise<Response> {
        console.log(request.body);
        const oParams: UserModel = {
            login: request.body.login,
            password: request.body.password,
            fullName: request.body.fullName ? request.body.fullName : "",
            photoUrl: request.body.photoUrl ? request.body.photoUrl : ""
        };

        return new Promise<Response>((resolve, reject) => {
            resolve(this.userRepo.addUser(oParams).then(data => {
                if (data === AuthStatus.USER_EXISTS) {
                    response.status(403);
                    response.statusMessage = AuthStatus.USER_EXISTS;

                    return response.json({message: "User already exists"});
                }

                // this.uploadServise.uploadPhoto(file, "metadata");

                return response.json({rep: request.body, data, token: jwt.sign(oParams.login, 'feed')});
            }).catch(err => response.json({err, msg: "FUCK", resp: request.body})));
            reject(this.loggerService.log('Unhandled error', LogStatus.ERROR));
        });
    }

    @httpGet('/logout')
    public logout(request: Request, response: Response): Promise<Response> {

        return new Promise<Response>((resolve, reject) => {
            request.logOut();

            return response.json({ message: "Successfully logged out" });
        });
    }
}
