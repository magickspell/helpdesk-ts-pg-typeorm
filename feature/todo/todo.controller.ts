import { Router, Request, Response } from 'express';
import { cancellAllTodo, createTodo, getTodos, updateTodo } from './todo.service'
import { Todo } from './todo.entity'
import { asyncHandler } from '../../app/middlewares/errorHandler';
import { processStatusRequest } from './todo.helper';

/*
  По задаче нужно сделать 6 эндпоинтов.
  Можно было бы некоторые объеденить, но оставил как указано в задаче.
*/

const todoRouter = Router();

// 1 Создать обращение
todoRouter.post('/create', asyncHandler(async (req: Request, res: Response) => {
  const todo: Todo = await createTodo(req);
  res.status(200).json(todo).send();
}));

// 2 Получить список обращений с возможность фильтрации по конкретной дате и по диапазону дат.
todoRouter.get('/get', asyncHandler(async (req: Request, res: Response) => {
  const todos: Todo[] | undefined = await getTodos(req);
  res.status(200).json(todos);
}));

// 3 Взять обращение в работу
todoRouter.put('/start', asyncHandler(async (req, res) => {
  const status: number = await updateTodo(req);
  processStatusRequest(res, status);
}));

// 4 Завершить обработку обращения (с причиной завершения)
todoRouter.put('/done', asyncHandler(async (req, res) => {
  const status: number = await updateTodo(req);
  processStatusRequest(res, status);
}));

// 5 Отмена обращения (с причиной отмены)
todoRouter.delete('/cancel', asyncHandler(async (req, res) => {
  const status: number = await updateTodo(req);
  processStatusRequest(res, status);
}));

// 6 Отмена всех обращений в работе
todoRouter.delete('/cancel-all', asyncHandler(async (req, res) => {
  const status: number = (await cancellAllTodo()).affected ?? 0;
  processStatusRequest(res, status);
}));

export default todoRouter;