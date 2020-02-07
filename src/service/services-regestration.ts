import { Container } from 'inversify';
import { LoggerService, LoggerServiceImplementation } from './logger';

import {
    IUserRepo,
    UserRepository,
    ICategotyRepository,
    CategoryRepository
} from '../repo';

export const CONTAINER = new Container();

CONTAINER.bind<LoggerService>(LoggerService).to(LoggerServiceImplementation);
CONTAINER.bind<IUserRepo>(IUserRepo).to(UserRepository);
CONTAINER.bind<ICategotyRepository>(ICategotyRepository).to(CategoryRepository);
