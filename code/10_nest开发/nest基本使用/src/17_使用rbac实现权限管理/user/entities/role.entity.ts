import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '角色名',
  })
  name: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createDate: Date;
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateDate: Date;

  //与权限创建多对多关系
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permisiion_role_relation',
  })
  permissions: Permission[];
}
