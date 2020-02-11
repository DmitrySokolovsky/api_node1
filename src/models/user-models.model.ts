import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, AllowNull, HasMany } from 'sequelize-typescript';
import 'reflect-metadata';
import { Topic } from './topic.model';

@Table({
    timestamps: false
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @CreatedAt
    public createdAt: Date;

    @Column
    public login: string;

    @Column
    public password: string;

    @AllowNull(true)
    @Column
    public fullName?: string;

    @AllowNull(true)
    @Column
    public photoUrl?: string;

    @HasMany(() => Topic)
    public topics: Topic[];
}

export abstract class UserModel {
    public id?: number;
    public login: string;
    public password?: string;
    public fullName?: string;
    public photoUrl?: string;
}
