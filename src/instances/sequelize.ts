import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    username: 'postgres',
    password: 'sokill666', // at home version = Dimmy_1989_guNN' // at WPC sokill666
    modelPaths: [__dirname + '/models']
});
