import db, { type Todo, tableTodos } from '$lib/db';
// import type { BaseResponse } from '$lib/types'

export async function load({ }) {
  const result = await db.select<Todo>(`SELECT * FROM ${tableTodos}`);

  return {
    todos: result,
  };
}
