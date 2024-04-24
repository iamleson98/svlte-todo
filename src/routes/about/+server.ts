import { json } from '@sveltejs/kit';
import db from '$lib/db';
// import sqlite3 from 'sqlite3';
import type { Person } from '$lib/db';

export function GET() {
	// const number = Math.floor(Math.random() * 6) + 1;

	// return json(number);

  let error: string | undefined;
  let person: Person | undefined;

  db.get('SELECT * FROM users', (err, row) => {
    if (err) {
      // console.error('Error reading database', err);
      error = err.message;
      return;
    }

    person = row as Person;
  });

  if (error) {
    return json(error);
  }

  return json(person);
}
