import { Role } from './role.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    createDate: Date;
    updateDate: Date;
    roles: Role[];
}
