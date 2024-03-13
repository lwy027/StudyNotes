import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { IdCard } from "./IdCard";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  //在主表中查询从表,需要指定第二个参数
  @Column()
  age: number;
  @OneToOne(() => IdCard, (IdCard) => IdCard.user)
  idCard: IdCard;
}
