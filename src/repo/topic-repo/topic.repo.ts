import { Topic, TopicModel } from '../../models';
import { injectable, inject } from "inversify";
import { ITopicRepository } from "./topic.repo.interface";
import { LoggerService } from "../../service";
import { LogStatus } from "../../constant";

@injectable()
export class TopicRepository implements ITopicRepository {

    public constructor(@inject(LoggerService) private loggerService: LoggerService) { 
        this.loggerService.log(`Category repo usage`, LogStatus.INFO);
    }

    public getAlltopicsByCategoryId(categoryId: number): Promise<TopicModel[]> {
        
        return new Promise<TopicModel[]>((resolve, reject) => {
            Topic.findAll({
                where: {
                    categoryId
                }
            }).then(result => resolve(result))
            .catch(error => {
                console.log('topic repo error', error);
                reject(error);
            });
        });
    }

    public addNewTopic(oParams: TopicModel): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            Topic.create({ ...oParams })
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    } 
}
