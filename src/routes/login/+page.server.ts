import { default as dbIface, tableUser, type User } from '$lib/db';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get('password');

        try {
            const query = `SELECT * FROM ${tableUser} WHERE user_name = ? AND password = ?`;
            const user = await dbIface.get<User>(query, [username, password]);

            if (!user)
                return {
                    code: 400,
                    message: "username or password incorrect"
                }

            cookies.set('user_id', user.id.toString(), {
                maxAge: 60 * 60 * 24,
                path: '/'
            });

            return {
                code: 201,
                message: "successfully",
                redirect: '/todos',
            }
        } catch (error: any) {
            return {
                code: 500,
                message: "login error"
            }
        }
    },
};
