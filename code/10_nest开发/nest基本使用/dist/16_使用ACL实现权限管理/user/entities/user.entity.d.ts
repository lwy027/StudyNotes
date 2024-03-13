import { Permission } from './permision.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    createTime: Date;
    updateTime: Date;
    permissions: Permission[];
}
