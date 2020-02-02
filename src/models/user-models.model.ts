import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, AllowNull } from 'sequelize-typescript';
import 'reflect-metadata';

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
}

export abstract class UserModel {
    public id?: number;
    public login: string;
    public password?: string;
    public fullName?: string;
    public photoUrl?: string;
}
