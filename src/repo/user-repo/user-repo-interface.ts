import { User, UserModel } from "../../models/user-models.model";

export abstract class IUserRepo {
    public abstract addUser(user: UserModel): Promise<UserModel | String>;
    public abstract logIn(param: UserModel): Promise<UserModel>;
    public abstract getUserWithName(email: string): Promise<User>;
    public abstract getAllUsers(): Promise<UserModel[]>;
}
