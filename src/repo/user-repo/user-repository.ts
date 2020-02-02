import { UserModel, User } from "../../models/user-models.model";
import { IUserRepo } from "./user-repo-interface";
import { injectable, inject } from "inversify";
import { LoggerService } from "../../service";
import { LogStatus, AuthStatus } from "../../constant";
import { sequelize } from "../../instances";
import { resolve } from "bluebird";
//import { reject } from "bluebird";

@injectable()
export class UserRepository implements IUserRepo {
    
    public constructor(@inject(LoggerService) private loggerService: LoggerService) { 
        this.loggerService.log(`User Repository usage`, LogStatus.INFO);
    }

    public addUser(oParams: UserModel): Promise<UserModel | String> {

        return new Promise<UserModel | String>((resolve, reject) => {
            this.checkIfUserExists(oParams).then((exists: Boolean) => {
                if (exists) {
                    resolve(AuthStatus.USER_EXISTS);
                } else {
                    User.create(oParams).then(
                        (res) => {
                            const oData: UserModel = {
                                id: res.id,
                                login: res.login,
                                fullName: res.fullName,
                                photoUrl: res.photoUrl
                            };
        
                            return resolve(oData);
                        }
                    ).catch(
                        (error) => {
                            this.loggerService.log("REPO => " + JSON.stringify(error), LogStatus.ERROR);
        
                            return reject(error);
                        }
                    );
                }
            }).catch(error => reject(error));
        });
    }

    public logIn(oParams: UserModel): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            User.findOne({
                where: {
                    login: oParams.login,
                    password: oParams.password
                }
            }).then(res => {
                const oUserData: UserModel = {
                    login: res.login,
                    id: res.id,
                    fullName: res.fullName,
                    photoUrl: res.photoUrl
                };
                resolve(oUserData);
            }).catch(error => this.loggerService.log(error.errmsg + 'UserRepo', LogStatus.ERROR));
        });
    }

    public getUserWithName(name: string): Promise<User> {

        return new Promise<User>((resolve, reject) => {
            User.sequelize.query('SELECT id , name FROM "User" WHERE name=' + "'" + name + "'", {type: sequelize.QueryTypes.SELECT})
            .then((res) => resolve(res[0]))
            .catch(error => reject(this.loggerService.log(error.errmsg + 'getUser withName', LogStatus.ERROR)));
        });
    }

    public getAllUsers(): Promise<UserModel[]> {

        return new Promise<UserModel[]>((resolve, reject) => {
            User.findAll({ attributes: ['id', 'fullName', 'login', 'photoUrl'] })
            .then((result) => {
                resolve(result);
            })
            .catch(error => {
                reject(this.loggerService.log(error + 'getUser withName', LogStatus.ERROR));
            });
        });
    }

    private checkIfUserExists(oParams: UserModel): Promise<Boolean> {

        return new Promise<Boolean>((resolve, reject) => {
            User.findOne({
                where: {
                    login: oParams.login,
                }
            }).then(result => {
                if (result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(error => reject(error));
        });
    }
}
