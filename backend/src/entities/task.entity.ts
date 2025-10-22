import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Status } from "./status.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id_task!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Status, (status) => status.tasks)
    @JoinColumn({ name: "id_status" })
    status!: Status;
}