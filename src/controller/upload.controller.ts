import { controller, httpPost, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { LoggerService, UploadInteface } from '../service';

@controller('/api/upload')
export class UploadController {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
        @inject(UploadInteface) private uploadServise: UploadInteface
    ) { }

    @httpPost('/')
    public upload(request: Request, response: Response): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(response.send({ ...request.body }));
        });
    }
}
