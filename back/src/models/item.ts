import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "date" })
  deadlineDate!: Date;

  @Column({ type: "time", nullable: true })
  deadlineTime?: string;

  @Column({ type: "int", default: 0 }) 
  order!: number;
}
