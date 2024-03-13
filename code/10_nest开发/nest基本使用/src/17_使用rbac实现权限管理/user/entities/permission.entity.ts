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
    comment: '权限名',
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
}
