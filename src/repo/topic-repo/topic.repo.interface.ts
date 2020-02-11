import { TopicModel } from "../../models";

export abstract class ITopicRepository {
    public abstract getAlltopicsByCategoryId(categoryId: number): Promise<TopicModel[]>;
    public abstract addNewTopic(oParams: TopicModel): Promise<any>;
}
