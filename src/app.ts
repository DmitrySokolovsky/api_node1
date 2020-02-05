import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import * as morgan from 'morgan';
import * as express from 'express';
import * as passport from 'passport';

import { InversifyExpressServer } from 'inversify-express-utils';
import { LoggerService, LoggerServiceImplementation } from './service';
import { LogStatus } from './constant';
import { CONTAINER } from './service/services-regestration';

import './controller';

import { User, Category } from './models';
import { sequelize } from './instances';

import './instances/passport';

let logger: LoggerService = new LoggerServiceImplementation();

sequelize.authenticate().then(() => {
    logger.log(`DATABASE CONNECTED\n`,
        LogStatus.INFO);
    logger.log('Press CTRL+C to stop\n', LogStatus.INFO);
});
sequelize.addModels([User, Category]);
sequelize.sync();

let server = new InversifyExpressServer(CONTAINER);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(morgan('dev'));
    app.use(express.static('../p_001_APP/build'));
    app.use((req: any, res: any, next: any): void => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Content-Type", "application/json; charset=utf-8");
        next();
    });
});

let serverInstance = server.build();

serverInstance.listen(3001, () => { // WORK - 192.168.150.88; HOME - 192.168.100.16
    logger.log(`App is running`,
        LogStatus.INFO);
    logger.log('Press CTRL+C to stop\n', LogStatus.INFO);
});
