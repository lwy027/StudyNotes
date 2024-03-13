import { Permission } from './permission.entity';
export declare class Role {
    id: number;
    name: string;
    createDate: Date;
    updateDate: Date;
    permissions: Permission[];
}
