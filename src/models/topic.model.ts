import { Table, Column, Model, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './category.model';
import 'reflect-metadata';

@Table({
    timestamps: false
})
export class Topic extends Model<Topic> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public displayName: string;

    @Column
    public name: string;

    @ForeignKey(() => Category)
    @Column
    public categoryId: number;

    @BelongsTo(() => Category)
    public category: Category;
}

export abstract class TopicModel {
    public id: number;
    public displayName: string;
    public name: string;
    public categoryId: number;
}
