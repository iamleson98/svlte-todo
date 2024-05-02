import { default as db, default as dbIface, tableTodos, type Todo } from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ }) {
  const result = await db.select<Todo>(`SELECT * FROM ${tableTodos}`);

  return {
    todos: result,
  };
}

export const actions: Actions = {
  addTodo: async ({ cookies, request }) => {
      const data = await request.formData();
      const todo = data.get("todo");

      const query = `INSERT INTO ${tableTodos} ( title, content, created_at, user_id) VALUES ( ?, ?, ?, ?)`;
      const args = [todo, '', new Date().toISOString(), 1];
      try {
          await dbIface.insert(query, args);

          return {
              code: 201,
              message: 'todo created successfully'
          };
      } catch (err: any) {
          let message = 'failed insert todo';
          return fail(500, { message, code: 500 });
      }
  }
};
