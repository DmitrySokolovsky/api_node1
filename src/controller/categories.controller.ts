import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { ICategotyRepository } from '../repo';
import { LoggerService } from '../service';
import * as passport from 'passport';
import { LogStatus } from '../constant';

@controller('/api/categories', passport.authenticate('jwt', {session: false}))
export class CategoriesController {
    constructor(
        @inject(ICategotyRepository) private categoryRepo: ICategotyRepository,
        @inject(LoggerService) private loggerService: LoggerService
    ) { }

    @httpGet('/')
    public getAllCategories(request: Request, response: Response): Promise<Response> {

        return new Promise<Response>((resolve, reject) => {
            this.categoryRepo.getAllCategories()
                .then(result => response.json(result))
                .catch(error => {
                    response.statusCode = 400;
                    response.statusMessage = error.message;
                    response.sendStatus(400);
                });
        });
    }
}
