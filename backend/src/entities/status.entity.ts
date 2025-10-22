import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id_status!: number;

  @Column({  type: 'varchar', default: "default_status" })
  status!: string;

  @OneToMany(() => Task, (task) => task.status)
  tasks!: Task[];
}
