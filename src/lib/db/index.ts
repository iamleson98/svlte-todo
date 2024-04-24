import sqlite3 from 'sqlite3';

function createDB() {
  const db = new sqlite3.Database('./todos.db', (err) => {
    if (err) {
      console.error('Error opening database', err);
    }
  });

  console.log("Connedted to database. Creating tables...");

  // db.serialize(() => {
  //   db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)');
  //   db.run('INSERT INTO users (name) VALUES (?)', 'Alice');
    // db.run('INSERT INTO users (name) VALUES (?)', 'Bob');
  // });

  return db;
}

const db = createDB();

export default db;
export type { Person } from './types';
