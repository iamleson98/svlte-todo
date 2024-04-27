import sqlite3 from "sqlite3";

const createUserTable = `create table if not exists users (
	id integer not null primary key,
	user_name text unique not null,
	avatar text,
	created_at text default current_timestamp,
	is_active integer not null,
	password text not null
)`;

export interface User {
  id: number;
  user_name: string;
  avatar?: string;
  created_at: string;
  is_active: number;
  password: string;
};

const createTodoTable = `create table if not exists todos (
	id integer not null primary key,
  title text unique not null,
	content text not null,
	created_at text default current_timestamp,
	user_id integer not null,
	
	foreign key (user_id) references users (id) ON delete cascade
)`;


export interface Todo {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: number;
};

const migrateQueries = [
  createUserTable,
  createTodoTable,
];

export const tableUser = 'users';
export const tableTodos = 'todos';

export interface SelectOptions {
  limit?: number;
  offset?: number;
}

export default class TodoDatabase {
  private readonly db: sqlite3.Database;
  private timeout: number;
  private dbPath: string;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
    this.db = this.openDB();
    this.timeout = this.migrateDB();
  }

  private openDB(): sqlite3.Database {
    return new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        throw new Error(`failed to open database connection, err: ${err.message}`);
      }

      console.debug('connected to database')
    })
  }

  private migrateDB() {
    return setTimeout(() => {
      migrateQueries.forEach((query, idx) => {
        console.debug(`migrating query ${idx + 1}: ${query.split('\n').map(line => line.trim()).join(' ')}`);

        this.db.run(query, (err) => {
          if (err) {
            throw new Error(`failed to migrate query ${idx + 1}, err: ${err.message}`);
          }
        })
      })
    }, 1000);
  }

  close() {
    clearTimeout(this.timeout);
    this.db.close((err) => {
      if (err) {
        throw new Error(`failed to close database connection, err: ${err.message}`);
      }
    });
  }

  select<T>(query: string, args?: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, args, (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows as T[]);
      });
    });
  }

  get<T>(query: string, args?: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get(query, args, (err, row) => {
        if (err) {
          reject(err);
        }

        resolve(row as T);
      })
    });
  }

  insert(query: string, args?: any[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(query, args, (err) => {
        if (err) {
          console.error(err);
          reject(false);
        }

        resolve(true);
      });
    })
  }

  update(query: string, args?: any[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(query, args, (err) => {
        if (err) {
          console.error(err);
          reject(false);
        }

        resolve(true);
      });
    })
  }

  delete(query: string, args?: []): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(query, args, (err) => {
        if (err) {
          console.error(err);
          reject(false);
        }

        resolve(true);
      });
    });
  }

  insertUser(user: User): Promise<boolean> {
    const query = `INSERT INTO ${tableUser} (id, user_name, avatar, created_at, is_active, password) VALUES (?, ?, ?, ?, ?, ?)`;
    const args = [user.id, user.user_name, user.avatar, user.created_at, user.is_active, user.password];

    return new Promise((resolve, reject) => {
      this.db.run(query, args, (err) => {
        if (err) {
          console.log("this is err in insertUser method: "+err)
          reject(false)
        }
        console.debug('Inserted user into the database');
        resolve(true)
      });
    })
  }

  async insertTodo(todo: Todo): Promise<boolean> {
    const query = `INSERT INTO ${tableTodos} (id, title, content, created_at, user_id)
                  VALUES (?, ?, ?, ?, ?)`;
    const args = [todo.id, todo.title, todo.content, todo.created_at, todo.user_id];

    try {
      await this.db.run(query, args);
      console.debug('Inserted todo into the database');
      return true;
    } catch (err) {
      console.error('Failed to insert todo into the database:', err);
      return false;
    }
  }

}
