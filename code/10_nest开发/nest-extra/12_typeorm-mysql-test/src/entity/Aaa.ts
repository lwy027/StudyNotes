import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("a_aa")
export class Aaa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: "姓名",
    comment: "这是姓名",
  })
  name: string;
  @Column({
    unique: true,
    nullable: true,
    length: 10,
    type: "varchar",
    default: "bbb",
  })
  bbb: string;
  @Column({
    type: "double",
  })
  ccc: number;
}
