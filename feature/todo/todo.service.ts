import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { Todo, TodoStatusE } from "./todo.entity";
import { getTodosDb, createTodoDb, updateTodoDb, cancellAllTodoDb } from "./todo.repo"
import { Request } from 'express';

function validateDate(date: string): boolean {
  try {
    const nums: string[] = date.split(".");
    const chars: string[] = date.split("");

    if (
      date.length !== 10
      || chars.filter(char => char === ".").length !== 2
      || nums.length !== 3
      || nums[0].length !== 2 || nums[1].length !== 2 || nums[2].length !== 4
    ) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

// todo validate all
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
    throw new Error("id wasnot provided");
  }

  const status: TodoStatusE | undefined = req.body.status;
  const note: string | undefined = req.body.note;

  // сделатл проверки статусов ?

  return (await updateTodoDb(id, status, note)).affected ?? 0; 
}

export async function cancellAllTodo(): Promise<UpdateResult> {
  return await cancellAllTodoDb(); 
}