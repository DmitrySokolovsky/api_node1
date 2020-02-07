import { CategoryModel } from "../../models";

export abstract class ICategotyRepository {
    public abstract getAllCategories(): Promise<CategoryModel[]>;
}
