import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum TodoStatusE {
  NEW = 'new', 
  PROGRESS = 'progress',
  DONE = 'done',
  CANCEL = 'cancel'
}

export interface TodoI {
  todoId: string;
  todoStatus: TodoStatusE;
  todoTitle: string;
  todoText: string;
  todoNote: string;
}

@Entity({ schema: "public", name: "todos" })
export class Todo extends BaseEntity implements TodoI {
  @PrimaryGeneratedColumn("uuid")
  todoId: string;

  @Column({ name: "todo_status", default: TodoStatusE.NEW })
  todoStatus: TodoStatusE;

  @Column()
  todoTitle: string;

  @Column()
  todoText: string;

  @Column({ default: "" })
  todoNote: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
