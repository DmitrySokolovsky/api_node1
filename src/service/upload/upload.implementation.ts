import { bucket } from '../../instances/bucket';
import { injectable } from "inversify";
import { UploadInteface } from './upload.interface';

@injectable()
export class Upload implements UploadInteface {
    public uploadPhoto(file: any, metadata: any): Promise<any> {

        return new Promise((resolve, reject) => {
            const options = {
                destination: file,
                resumable: false,
                metadata: {
                    metadata: metadata
                }
            };

            bucket.upload(file, options, (error: any, remoteFile: any): any => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(remoteFile);
                }
            });
        });
    }
}
