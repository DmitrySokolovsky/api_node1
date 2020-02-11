import { controller, httpPost, httpGet, requestParam, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { ITopicRepository } from '../repo';
import { LoggerService } from '../service';
import { LogStatus, AuthStatus } from '../constant';
import * as jwt from 'jsonwebtoken';

@controller('/api/topic')
export class TopicController {
    constructor(
        @inject(ITopicRepository) private topicRepo: ITopicRepository,
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    @httpGet('/:categoryId')
    public getTopicByCategoryId(@requestParam("categoryId") categoryId: string, @response() response: Response): Promise<void> {
        const id = parseInt(categoryId);

        return new Promise<void>((resolve, reject) => {
            this.topicRepo.getAlltopicsByCategoryId(id).then(result => {
                response.send(result);
            }).catch(error => {
                console.log('controller error');
                response.send(error);
            });
        });
    }

    @httpPost('/')
    public addTopic(request: Request, response: Response): Promise<void> {
        const oParams = request.body;

        return new Promise<void>((resolve, reject) => {
            this.topicRepo.addNewTopic(oParams).then(result => {
                response.send(result);
            }).catch(error => response.send(error));
        });
    }
}
