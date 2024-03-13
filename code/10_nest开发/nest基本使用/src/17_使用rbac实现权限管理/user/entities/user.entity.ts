import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '用户名',
  })
  username: string;
  @Column({
    comment: '密码',
  })
  password: string;
  @CreateDateColumn({
    comment: '创建时间',
  })
  createDate: Date;
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateDate: Date;

  //与角色表创建多对多关系
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[];
}
