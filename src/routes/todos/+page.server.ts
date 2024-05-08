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
  },

  updateContent: async ({request}) => {
    const data = await request.formData();
    const contentUpdate = data.get("content");
    const todoId = data.get("todoId");

    if (!contentUpdate || !todoId) {
      console.log("loi")
      return fail(400, { message: "Missing content or todoId", code: 400 });
    }else{
      console.log("hi")
    }

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
};
