/// <reference types="multer" />
export declare class FileSliceController {
    uploadFiles(files: Array<Express.Multer.File>, body: any): string;
    static ll: string;
    private logger;
    private mylogger;
    print(): void;
}
