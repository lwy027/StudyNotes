import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '权限名称',
  })
  name: string;
  @Column({
    comment: '权限描述',
  })
  desc: string;

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
