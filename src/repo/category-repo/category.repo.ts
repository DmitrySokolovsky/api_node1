import { Category, CategoryModel } from '../../models';
import { injectable, inject } from "inversify";
import { ICategotyRepository } from "./category.repo.interface";
import { LoggerService } from "../../service";
import { LogStatus } from "../../constant";

@injectable()
export class CategoryRepository implements ICategotyRepository {

    public constructor(@inject(LoggerService) private loggerService: LoggerService) { 
        this.loggerService.log(`Category repo usage`, LogStatus.INFO);
    }

    public getAllCategories(): Promise<CategoryModel[]> {
        
        return new Promise<CategoryModel[]>((resolve, reject) => {
            Category.findAll()
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    this.loggerService.log("Error in category repo", LogStatus.ERROR);
                    reject(error);
                });
        });
    }
}
