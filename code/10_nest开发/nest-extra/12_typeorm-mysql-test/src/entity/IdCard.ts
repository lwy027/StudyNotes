import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: "身份证号",
  })
  cardName: string;

  //表示一对一的关系，并且指定外键列在 IdCard 对应的表里维护：
  @JoinColumn()
  @OneToOne(() => User, {
    //cascade级联保存,当从表保存时，主表会自动进行保存
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
