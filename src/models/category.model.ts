import { Table, Column, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import 'reflect-metadata';

@Table({
    timestamps: false
})
export class Category extends Model<Category> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public displayName: string;

    @Column
    public name: string;

    @Column
    public colorStart: string;

    @Column
    public colorEnd: string;

    @Column
    public backgroundImage: string;
}

export abstract class CategoryModel {
    public id: number;
    public displayName: string;
    public name: string;
    public colorStart: string;
    public colorEnd: string;
    public backgroundImage: string;
}
