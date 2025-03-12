import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { Todo, TodoStatusE } from "./todo.entity";
import { getTodosDb, createTodoDb, updateTodoDb, cancellAllTodoDb } from "./todo.repo"
import { Request } from 'express';
import { validateDate } from "./todo.helper";

export const createTodo = async (req: Request) => {
  const title: string = req.body.title;
  const text: string = req.body.text;
  const uuid: string | undefined = req.body.uuid;
  return await createTodoDb(title, text, uuid);
};

export async function getTodos(req: Request): Promise<Todo[] | undefined> {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;

  let from: string;
  if (validateDate(fromDate)) {
    from = new Date((fromDate.split(".").reverse().join("."))).toISOString();
  } else {
    from = new Date("1901.01.13").toISOString();
  }

  let to: string;
  if (validateDate(toDate)) {
    to = new Date(toDate.split(".").reverse().join(".")).toISOString();
  } else {
    to = new Date("2901.12.13").toISOString();
  }

  return await getTodosDb(from, to);
}

export async function updateTodo(req: Request): Promise<number> {
  const id: string | undefined = req.body.id;
  if (!id) {
    throw new Error("id was not provided");
  }

  const status: TodoStatusE | undefined = req.body.status;
  const note: string | undefined = req.body.note;

  return (await updateTodoDb(id, status, note)).affected ?? 0; 
}

export async function cancellAllTodo(): Promise<UpdateResult> {
  return await cancellAllTodoDb(); 
}