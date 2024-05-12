import { default as db, default as dbIface, tableTodos, type Todo } from '$lib/db';
import type { Cookies } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ cookies }: { cookies: Cookies }) {
  const currentDate = new Date().toISOString().split('T')[0];

  const userId = cookies.get('user_id');

  if (!userId) {
    return fail(401, { message: 'Unauthorized', code: 401 });
  }

  const result = await db.select<Todo>(`SELECT * FROM ${tableTodos} WHERE DATE(created_at) = ? AND user_id = ?`, [currentDate, userId]);

  return {
    todos: result,
  };
}

export const actions: Actions = {
  addTodo: async ({ cookies, request }) => {
    const data = await request.formData();
    const todo = data.get("todo");
    const userId = cookies.get('user_id');

    if (!userId) {
      return fail(401, { message: 'Unauthorized', code: 401 });
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const existingTodo = await db.select<Todo>(`SELECT * FROM ${tableTodos} WHERE DATE(created_at) = ? AND title = ? AND user_id = ?`, [currentDate, todo, userId]);

    if (existingTodo.length > 0) {
      return fail(400, { message: 'A similar todo already exists for today', code: 400 });
    }

    const query = `INSERT INTO ${tableTodos} ( title, content, created_at, user_id) VALUES ( ?, ?, ?, ?)`;
    const args = [todo, '', new Date().toISOString() , userId];
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
  },

  updateContent: async ({ request }) => {
    const data = await request.formData();
    const contentUpdate = data.get("content");
    const todoId = data.get("todoId");

    const query = `UPDATE ${tableTodos} SET content = ? WHERE id = ?`;
    const args = [contentUpdate, todoId]

    try {
      await dbIface.update(query, args);

      return {
        code: 200,
        message: "Todo content updated successfully",
      };
    } catch (err: any) {
      console.error("Failed to update todo content:", err);
      return fail(500, { message: "Failed to update todo content", code: 500 });
    }
  },

  deleteTodo: async ({request}) => {
    const data = await request.formData();
    const idTodo = data.get("idTodo");

    const query = `DELETE FROM ${tableTodos} WHERE id = ?`;
    const args = [idTodo]

    try {
      await dbIface.delete(query, args)

      return{
        code: 200,
        message: "todo delete successfully"
      }
    } catch (err:any) {
      console.error("Failed to delete todo ", err)
      return fail(500, {message: "Failed to delete todo ", code: 500})
    }
  }
};
