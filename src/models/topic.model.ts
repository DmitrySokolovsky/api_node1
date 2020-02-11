import { Table, Column, Model, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './category.model';
import { User } from './user-models.model';
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
    public description: string;

    @ForeignKey(() => Category)
    @Column
    public categoryId: number;

    @ForeignKey(() => User)
    @Column
    public userId: number;

    @BelongsTo(() => Category)
    public category: Category;

    // @BelongsTo(() => User)
    // public user: User;
}

export abstract class TopicModel {
    public id?: number;
    public displayName: string;
    public description: string;
    public categoryId: number;
}
