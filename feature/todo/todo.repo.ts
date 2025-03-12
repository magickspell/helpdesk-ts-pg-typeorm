import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { AppDataSource } from "../../app/db/db";
import { Todo, TodoStatusE } from "./todo.entity";
import { Between, Repository, UpdateQueryBuilder, UpdateResult } from "typeorm";

export const upsertTodoDb = async (pool: any, todo: Todo) => {
  
};

export const createTodoDb: (
  title: string,
  text: string,
  uuid: string | undefined
) => Promise<Todo> = async (
  title: string,
  text: string,
  uuid: string | undefined
) => {
  const emanager: Repository<Todo> = AppDataSource.createEntityManager().getRepository(Todo);

  const dto: Partial<Todo> = {
    todoTitle: title,
    todoText: text,
  };

  if (uuid && uuid.length) {
    const oldTodo: Todo | null = await emanager.findOne({ where: { todoId: uuid }});
    if (oldTodo) {
      throw new Error(`todo with id '${uuid}' already exists`);
    }
    dto.todoId = uuid;
  }

  return await emanager.create(dto).save();
};

export async function getTodosDb(fromDate: string, toDate: string): Promise<Todo[] | undefined> {
  const manager: EntityManager = AppDataSource.createEntityManager();
  return await manager.getRepository(Todo).find({ where: {
    createdAt: Between(fromDate, toDate)
  }});
}

export async function updateTodoDb(id: string, status?: TodoStatusE, note?: string): Promise<UpdateResult> {
  const manager: EntityManager = AppDataSource.createEntityManager();

  const query: UpdateQueryBuilder<Todo> = manager.getRepository(Todo)
    .createQueryBuilder()
    .update()
    .where({
      todoId: id
    });
  
  const setDto: Partial<Todo> = {};
    
  if (status) {
    setDto.todoStatus = status;
  }
  if (note) {
    setDto.todoNote = note;
  }

  return await query.set(setDto).execute();
}

export async function cancellAllTodoDb() {
  const manager: EntityManager = AppDataSource.createEntityManager();
  const query: UpdateQueryBuilder<Todo> = manager.getRepository(Todo)
    .createQueryBuilder()
    .update()
    .where({ todoStatus: TodoStatusE.PROGRESS })
    .set({ todoStatus: TodoStatusE.CANCEL });


  return await query.execute();
}
