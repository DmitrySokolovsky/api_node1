export abstract class UploadInteface {
    public abstract uploadPhoto(file: any, metadata: any): Promise<any>;
}
