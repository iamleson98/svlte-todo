import TodoDatabase from "./interface";

const dbIface = new TodoDatabase('./db.sqlite3');

export default dbIface;
export type { User, Todo } from './interface'
export {
  tableTodos,
  tableUser,
} from './interface';
