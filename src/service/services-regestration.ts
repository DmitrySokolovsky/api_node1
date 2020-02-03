import { Container } from 'inversify';
import { LoggerService, LoggerServiceImplementation } from './logger';
import { Upload, UploadInteface } from './upload';

import {
    IUserRepo,
    UserRepository,
} from '../repo';

export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<IUserRepo>(IUserRepo).to(UserRepository);
CONTAINER.bind<UploadInteface>(UploadInteface).to(Upload);
