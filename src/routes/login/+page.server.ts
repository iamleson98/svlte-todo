// import type { User } from "$lib/db";
// import dbIface, { tableUser } from "$lib/db";
// export async function login(username: string, password: string): Promise<User | null> {
//     try {
//         const query = `SELECT * FROM ${tableUser} WHERE user_name = ? AND password = ?`;
//         const user = await dbIface.get<User>(query, [username, password]);
//         dbIface.close();
//         return user;
//     } catch (error) {
//         console.error('Error :', error);
//         return null;
//     }
// }
